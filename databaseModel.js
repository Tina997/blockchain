const connection = require("./connection");
const Block = require("./server/blockchain/block");
const {cryptoHash} = require("./server/util");

module.exports = {
    async insert(data){
        let lastHash = obtainLastHash();
        console.log('lasHash: ',lastHash);
        let timestamp = Date.now().toLocaleString();
        console.log('timestamp: ',timestamp);
        //const timestamp = '2022/04/04 19:19:00';
        let difficulty = Block.adjustDifficulty({originalBlock: lastBlock, timestamp});
        console.log('difficulty: ', difficulty);
        let hash = cryptoHash(timestamp, lastHash, data, difficulty);
        console.log('hash: ', hash);
        /*let results = await connection.query(`insert into block_table
        (timestamp, lastHash, hash, difficulty, data)
        values ($1, $2, $3, $4, $5)`,[timestamp, lastHash, hash, difficulty, data]);

        return results;*/

       /* await connection.query(`insert into block_table
        (timestamp, lastHash, hash, difficulty, data)
        values ('2022/02/20 7:20:00.59', 'hash-one', '----', 1, 'foo-data')`);*/

        await connection.query(`insert into block_table
        (timestamp, lastHash, hash, difficulty, data)
        values (`+timestamp+`, `+ lastHash+`, `+ hash+`, `+ difficulty+ `, `+ data`)`);
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