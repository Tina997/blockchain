const connection = require("./connection");
const Block = require("./server/blockchain/block");
const {MINE_RATE} = require("./config");
const {cryptoHash} = require("./server/util");
const Blockchain = require("./server/blockchain");
const blockchain = new Blockchain();

module.exports = {
    async insert(data){
        let lastBlocks = await connection.query("select * from block_table order by timestamp desc limit 1");
        /*let lastHash = lastBlock.rows[0].hash;
        let lastDate = new Date(lastBlock.rows[0].timestamp);
        let today = new Date();
        let timestamp = today.toLocaleString();
        let difficulty = (today.valueOf() - lastDate.valueOf()) > MINE_RATE ? lastBlock.rows[0].difficulty - 1: lastBlock.rows[0].difficulty + 1;
        let hash = cryptoHash(timestamp, lastHash, data, difficulty)+ ' ';*/
        const lastBlock = new Block(lastBlocks.rows[0].timestamp,lastBlocks.rows[0].lastHash,lastBlocks.rows[0].hash,
            lastBlocks.rows[0].difficulty,lastBlocks.rows[0].data);
        /*console.log("Hola");
        console.log(lastBlocks.rows[0].timestamp);
        console.log(lastBlock);*/
        let newBlock = blockchain.addBlock(lastBlock,data);
        console.log(newBlock.Block);
        let timestamp = newBlock.timestamp.toLocalString();
        console.log(timestamp);
        let lastHash = newBlock.lastHash;
        let hash = newBlock.hash;
        let difficulty = newBlock.difficulty;
        result = await connection.query(`insert into block_table
        (timestamp, lastHash, hash, difficulty, data)
        values ($1, $2, $3, $4, $5)`,[timestamp, lastHash, hash, difficulty, data]);

        return result;
    },
    async obtainAll(){
        const results = await connection.query("SELECT * FROM block_table");
        return results;
    },
}