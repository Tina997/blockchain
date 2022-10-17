const hexToBinary = require('hex-to-binary');
const { GENESIS_DATA, MINE_RATE } = require("../../config");
const {cryptoHash} = require("../util");
const { Pool } = require('pg');
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

class Block{
    constructor(timestamp, lastHash, hash, difficulty, data){
        this.timestamp = timestamp;
        this.lastHash = lastHash;
        this.hash = hash;
        this.data = data;
        this.difficulty = difficulty;
    }


    static genesis(){
        return new Block(GENESIS_DATA); 
    }

    static mineBlock(lastBlock, data){
        let lastHash = lastBlock.hash;
        let hash, timestamp, difficulty;
        do{
            timestamp = new Date().toLocaleString();
            difficulty = Block.adjustDifficulty(lastBlock, timestamp);
            hash = cryptoHash(timestamp, lastHash, data, difficulty);
        }while(hexToBinary(hash).substring(0, difficulty)!=='0'.repeat(difficulty));

        return new this(timestamp, lastHash, hash, difficulty, data);
    }

    static adjustDifficulty(originalBlock, timestamp){
        const{ difficulty } = originalBlock;

        if(difficulty < 1) return 1; 

        if(( timestamp - originalBlock.timestamp) > MINE_RATE) return difficulty -1;

        return difficulty +1;
    }
}

module.exports = Block;