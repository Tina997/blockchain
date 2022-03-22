const redis = require('../../node_modules/redis');
const { parse } = require('request/lib/cookies');
//const REDIS_URL = process.env.REDIS_URL || process.env.REDIS_LOCAL_URL

const CHANNELS = {
    TEST:'TEST',
    BLOCKCHAIN: 'BLOCKCHAIN',
    TRANSACTION : 'TRANSACTION'
};

class PubSub{
    constructor({blockchain, transactionPool, redis_URL}){
        this.blockchain = blockchain;
        this.transactionPool = this.transactionPool;

        this.publisher = redis.createClient(REDIS_URL);
        this.subscriber = redis.createClient(REDIS_URL);

        this.subscribeToChannels();

        this.subscriber.on('message', 
        (channel, message) => this.handleMessage(channel, message)
        );

    }

    handleMessage(channel, message){
        console.log(`Message received. Channel: ${channel}. Message: ${message}.`);

        const parsedMessage = JSON.parse(message);

        switch(channel){
            case CHANNELS.BLOCKCHAIN:
                this.blockchain.replaceChain(parsedMessage, ()=>{
                  this.transactionPool.clearBlockchainTransactions({
                    chain: parsedMessage
                  });  
                });
                break;
            case CHANNELS.TRANSACTION:
                this.transactionPool.setTransaction(parsedMessage);
                break;
            default: 
                return;
        }
    }

    subscribeToChannels(){
        Object.values(CHANNELS).forEach(channel =>{
            this.subscriber.subscribe(channel);
        });
    }

    publish({channel, message}){
        this.subscriber.unsubscribe(channel,() =>{
            this.publisher.publish(channel, message, () =>{
                this.subscriber.subscribe(channel);
            });
        });
    }

    broadcastChain(){
        this.publish({
            channel: CHANNELS.BLOCKCHAIN,
            message: JSON.stringify(this.blockchain.chain)
        });
    }

    broadcastTransaction(transaction){
        this.publish({
            channel: CHANNELS.TRANSACTION,
            message: JSON.stringify(transaction)
        });
    }
}

module.exports = PubSub;

