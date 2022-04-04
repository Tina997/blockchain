const connection = require("./connection");
const Block = require("./server/blockchain/block");
const {cryptoHash} = require("./server/util");

module.exports = {
    async insert(data){
        let lastHash = obtainLastHash();
        timestamp = Date.now();
        difficulty = Block.adjustDifficulty({originalBlock: lastBlock, timestamp});
        hash = cryptoHash(timestamp, lastHash, data, difficulty);
        let results = await connection.query(`insert into block_table
        (timestamp, lastHash, hash, difficulty, data)
        values ($1, $2, $3, $4, $5)`,[timestamp, lastHash, hash, difficulty, data]);

        return results;

    },
    async obtainLastHash(){
        const result = await connection.query("select hash from block_table order by timestamp desc limit 1");
        return result.rows[0];
    },
    async obtainAll(){
        const results = await connection.query("SELECT * FROM block_table");
        return results;
    }
}