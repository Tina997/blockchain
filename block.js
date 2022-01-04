const { GENESIS_DATA } = require("./config");

class Block{
    constructor({timestamp, lastHash, hash, data}){
        this.timestamp = timestamp;
        this.lastHash = lastHash;
        this.hash = hash;
        this.data = data;
    }


    static genesis(){
        return new Block(GENESIS_DATA); 
    }
}
/*const block1 = new Block({
    timestamp: '04/01/2022',
    lastHash: 'foo-lastHash',
    hash: 'foo-hash',
    data: 'foo-data'
});

console.log('block1',block1);*/

module.exports = Block;