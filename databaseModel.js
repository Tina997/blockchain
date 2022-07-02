const connection = require("./connection");
const Block = require("./server/blockchain/block");
const {MINE_RATE} = require("./config");
const {cryptoHash} = require("./server/util");
const Blockchain = require("./server/blockchain");
const blockchain = new Blockchain();

class DatabaseModel{

    constructor(){

    }

    static insert(newBlock){
        let timestamp = newBlock.timestamp;
        let lastHash = newBlock.lastHash;
        let hash = newBlock.hash;
        let difficulty = newBlock.difficulty;
        let data = newBlock.data;
        result = connection.query(`insert into block_table
        (timestamp, lastHash, hash, difficulty, data)
        values ($1, $2, $3, $4, $5)`,[timestamp, lastHash, hash, difficulty, data]);

        return result;
    }
    static obtainLastBlock(){
        let lastBlocks = connection.query("select * from block_table order by timestamp desc limit 1");
        const lastBlock = new Block(lastBlocks.rows[0].timestamp,lastBlocks.rows[0].lastHash,lastBlocks.rows[0].hash,
            lastBlocks.rows[0].difficulty,lastBlocks.rows[0].data);
        return lastBlock;
    }
    static obtainAll(){
        const results =  connection.query("SELECT * FROM block_table");
        return results;
    }
}
module.exports = DatabaseModel;
/*module.exports = {
    async insert(newBlock){
        /*let lastBlocks = await connection.query("select * from block_table order by timestamp desc limit 1");
        const lastBlock = new Block(lastBlocks.rows[0].timestamp,lastBlocks.rows[0].lastHash,lastBlocks.rows[0].hash,
            lastBlocks.rows[0].difficulty,lastBlocks.rows[0].data);
        let newBlock = blockchain.addBlock(lastBlock,data);*/
       /* let timestamp = newBlock.timestamp;
        let lastHash = newBlock.lastHash;
        let hash = newBlock.hash;
        let difficulty = newBlock.difficulty;
        let data = newBlock.data;
        result = await connection.query(`insert into block_table
        (timestamp, lastHash, hash, difficulty, data)
        values ($1, $2, $3, $4, $5)`,[timestamp, lastHash, hash, difficulty, data]);

        return result;
    },
    async obtainLastBlock(){
        let lastBlocks = await connection.query("select * from block_table order by timestamp desc limit 1");
        const lastBlock = new Block(lastBlocks.rows[0].timestamp,lastBlocks.rows[0].lastHash,lastBlocks.rows[0].hash,
            lastBlocks.rows[0].difficulty,lastBlocks.rows[0].data);
        return lastBlock;
    },
    async obtainAll(){
        const results = await connection.query("SELECT * FROM block_table");
        return results;
    },
}*/