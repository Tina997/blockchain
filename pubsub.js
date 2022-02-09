const redis = require('redis');
const REDIS_URL = process.env.REDIS_URL || process.env.REDIS_LOCAL_URL

const CHANNELS = {
    TEST:'TEST'
};

class PubSub{
    constructor(){
        this.publisher = redis.createClient(REDIS_URL);
        this.subscriber = redis.createClient(REDIS_URL);

        this.subscriber.subscribe(CHANNELS.TEST);

        this.subscriber.on('message', (channel, message) => this.handleMessage(channel, message)
        );
    }

    handleMessage(channel, message){
        console.log(`Message received. Channel: ${channel}. Message: ${message}.`);
    }
}

const testPubSub = new PubSub();


testPubSub.publisher.publish(CHANNELS.TEST, 'foo');

