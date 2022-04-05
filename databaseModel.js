const connection = require("./connection");
const Block = require("./server/blockchain/block");
const {cryptoHash} = require("./server/util");

module.exports = {
    async insert(data){
        let lastBlock = await connection.query("select * from block_table order by timestamp desc limit 1");
        let lastHash = lastBlock.rows[0].hash;
        //let lastHash = this.obtainLastHash();
        //console.log('lastHash: ', lastHash);
        let timestamp = new Date().toLocaleString();
        //console.log('timestamp: ', timestamp);
        //let difficulty = Block.adjustDifficulty({originalBlock: lastBlock, timestamp});
        let block = new Block(lastBlock);
        let difficulty = Block.adjustDifficulty(block, timestamp);
        console.log('difficulty: ', difficulty);
        let hash = cryptoHash(timestamp, lastHash, data, difficulty)+ ' ';
        //console.log('hash: ', hash);
        result = await connection.query(`insert into block_table
        (timestamp, lastHash, hash, difficulty, data)
        values ($1, $2, $3, $4, $5)`,[timestamp, lastHash, hash, difficulty, data]);

        /*await connection.query(`insert into block_table
        (timestamp, lastHash, hash, difficulty, data)
        values ('2022/02/20 8:20:00.59', 'hash-one', '----', 1, 'dummy')`);*/

        /*result = await connection.query(`insert into block_table
        (timestamp, lastHash, hash, difficulty, data)
        values (`+timestamp+`, `+ lastHash+`, `+ hash+`, `+ difficulty+ `, `+ data+`)`);*/

        return result;
    },
    async obtainLastHash(){
        console.log("Hola");
        const result = await connection.query("select * from block_table order by timestamp desc limit 1");
        console.log(result.rows);
        return result.rows.hash;
    },
    async obtainAll(){
        const results = await connection.query("SELECT * FROM block_table");
        return results;
    }
}