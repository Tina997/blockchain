const Block = require('./block');
const {cryptoHash} = require('../util');
const { obtainAll } = require('../../databaseModel');
const databaseModel = require('../../databaseModel');

class Blockchain{

    constructor(){
        this.chain = [Block.genesis()];
        //this.chain = blockchain.obtainAll();
        //this.chain = this.obtainAll();
    }

    addBlock( lastBlock, data ){
        const newBlock = Block.mineBlock(
            lastBlock,
            data
        );

       /* this.chain.push(newBlock);
        console.log(this.chain);*/
        return newBlock;
    }

    async obtainAll(){
        try{
            const chain = databaseModel.obtainAll();
            return (await chain).rows;
        }catch(error){
            console.log("Error", error);
        }
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