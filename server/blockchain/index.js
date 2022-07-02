const Block = require('./block');
const {cryptoHash} = require('../util');
const DatabaseModel = require('../../databaseModel');
const databaseModel = new DatabaseModel();
class Blockchain{

    constructor(){
        //this.chain = [Block.genesis()];
        //const databaseModel = new DatabaseModel;
        const template = databaseModel.obtainAll();
        this.chain = template.rows;
    }

    addBlock(data){
        let lastBlock = databaseModel.obtainLastBlock();
        console.log(lastBlock);
        const newBlock = Block.mineBlock(
            lastBlock,
            data
        );
        let result = databaseModel.insert(newBlock);

        return result;
        //this.chain.push(newBlock);
    }

    replaceChain(chain, onSuccess){
        if(chain.length <= this.chain.length){
            console.error('The incoming chain must be longer');
            return;
        }
        if(!Blockchain.isValidChain(chain)){
            console.error('The incoming chain must be valid');
            return;
        }

        if(onSuccess) onSuccess();
        console.log('replacing chain with', chain);

        this.chain = chain;
    }

    static isValidChain(chain){
        if(JSON.stringify(chain[0]) !== JSON.stringify(Block.genesis())){
            return false;
        };
        
        for(let i = 1; i< chain.length;i++){ 
            const{timestamp, lastHash, hash,nonce, difficulty, data} = chain[i];
            const actualLastHash = chain[i-1].hash;
            const lastDifficulty = chain[i-1].difficulty;

            if(lastHash != actualLastHash) return false;

            const validatedHash = cryptoHash(timestamp, lastHash, data, nonce, difficulty);

            if(hash !== validatedHash) return false;

            if(Math.abs(lastDifficulty - difficulty)>1) return false;
        }
        return true;
    }
}

module.exports = Blockchain; 