const connection = require("./connection");
const Block = require("./server/blockchain/block");
const {cryptoHash} = require("./server/util");

module.exports = {
    async insert(data){
        console.log("Estoy mas aquí");
        let lastBlock = await connection.query("select * from block_table order by timestamp desc limit 1");
        let lastHash = lastBlock.rows[0].hash;
        //let lastHash = this.obtainLastHash();
        console.log('lastHash: ', lastHash);
        let timestamp = Date.now();
        console.log('timestamp: ', timestamp);
       /* const timestamp = '2022/04/04 19:19:00';
        console.log('timestamp: ', timestamp);*/
        //let difficulty = Block.adjustDifficulty({originalBlock: lastBlock, timestamp});
        let difficulty = 5;
        console.log('difficulty: ', difficulty);
        let hash = cryptoHash(timestamp, lastHash, data, difficulty)+ ' ';
        console.log('hash: ', hash);
        await connection.query(`insert into block_table
        (timestamp, lastHash, hash, difficulty, data)
        values ($1, $2, $3, $4, $5)`,[timestamp, lastHash, hash, difficulty, data]);

        /*await connection.query(`insert into block_table
        (timestamp, lastHash, hash, difficulty, data)
        values ('2022/02/20 8:20:00.59', 'hash-one', '----', 1, 'dummy')`);*/

        /*await connection.query(`insert into block_table
        (timestamp, lastHash, hash, difficulty, data)
        values (`+timestamp+`, `+ lastHash+`, `+ hash+`, `+ difficulty+ `, `+ data`)`);*/
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