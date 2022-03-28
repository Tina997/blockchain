const bodyParser = require('body-parser');
const express = require('express');
const request = require('request');
const path = require('path');
const Blockchain = require('./server/blockchain');
const PubSub = require('./server/app/pubsub');
const TransactionPool = require('./server/wallet/transaction-pool');
const Wallet = require('./server/wallet');
const TransactionMiner = require('./server/app/transaction-miner');
const res = require('express/lib/response');

const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

const isDevelopment = process.env.ENV === 'development';

const REDIS_URL = isDevelopment ?
'redis://127.0.0.1:6379': 
'redis://:pa8f1306ae9ab8fe1e72e11104b0579279f1dc0f810f0ea0bd82ffb46b9f87698@ec2-34-195-207-177.compute-1.amazonaws.com:11909'
const DEFAULT_PORT = 3000;
const ROOT_NODE_ADDRESS = `http://localhost:${DEFAULT_PORT}`;

const app = express();
const blockchain = new Blockchain();
const transactionPool = new TransactionPool();
const wallet = new Wallet();
const pubsub = new PubSub({blockchain, transactionPool, redisUrl: REDIS_URL});
const transactionMiner = new TransactionMiner({blockchain, transactionPool, wallet, pubsub});


app.use(bodyParser.json());
app.use(express.static(path.join(__dirname,'client/dist')));

app.get('/api/blocks', (req, res) =>{
    res.json(blockchain.chain);
});

app.post('/api/mine', (req,res) => {
    const{data} = req.body;

    blockchain.addBlock({data});

    pubsub.broadcastChain();

    res.redirect('/api/blocks');
});

app.post('/api/transact', (req, res) =>{
    const {amount, recipient} = req.body;

    let transaction = transactionPool
    .existingTransaction({inputAddress: wallet.publicKey});

    try{
        if(transaction){
            transaction.update({senderWallet: wallet, recipient, amount});
        }else{
            transaction = wallet.createTransaction({
                recipient, 
                amount, 
                chain: blockchain.chain
            });
        }
         
    }catch(error){
        return res.status(400).json({type: 'error', message: error.message});
    }

    transactionPool.setTransaction(transaction);

    pubsub.broadcastTransaction(transaction);

    res.json({type: 'success', transaction});
});

app.get('/api/transaction-pool-map', (req,res) =>{
    res.json(transactionPool.transactionMap);
});

app.get('/api/mine-transactions',(req, res) =>{
    transactionMiner.mineTransaction();

    res.redirect('/api/blocks');
});

app.get('/api/wallet-info', (req,res) =>{
    const address = wallet.publicKey;
    
    res.json({
        address: wallet.publicKey,
        balance: Wallet.calculateBalance({chain: blockchain.chain, address: wallet.publicKey})
    });
});

app.get('/db', async (req, res) => {
    /*try {
      const client = await pool.connect();
      const result = await client.query('SELECT * FROM test_table');
      const results = { 'results': (result) ? result.rows : null};*/
      res.render('client/src/db',{});
      /*client.release();
    } catch (err) {
      console.error(err);
      res.send("Error " + err);
    }*/
  })

app.get('*', (req, res) =>{
    res.sendFile(path.join(__dirname, 'client/dist/index.html'));
})

const syncWithRootState = ()=>{
    request({url:`${ROOT_NODE_ADDRESS}/api/blocks`},(error, response, body) => {
        if(!error && response.statusCode == 200){
            const rootChain = JSON.parse(body);

            console.log('replace chain on a sync with', rootChain);
            blockchain.replaceChain(rootChain);
        }
    });
    request({url:`${ROOT_NODE_ADDRESS}/api/transaction-pool-map`},(error, response, body) =>{
        if(!error && response.statusCode === 200){
            const rootTransactionPoolMap = JSON.parse(body);

            console.log('replace transaction pool map on a sync with', rootTransactionPoolMap);
            transactionPool.setMap(rootTransactionPoolMap);
        }
    });
};


let PEER_PORT;
if(process.env.GENERATE_PEER_PORT === 'true'){
    PEER_PORT = DEFAULT_PORT + Math.ceil(Math.random()*1000);
}

const PORT = process.env.PORT || PEER_PORT || DEFAULT_PORT;
app.listen(PORT, () => {
    console.log(`Listening at localhost:${PORT}`);

    if(PORT!==DEFAULT_PORT){
        syncWithRootState();
    }
});
