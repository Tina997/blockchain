const connection = require("./connection");
const Block = require("./server/blockchain/block");
const { MINE_RATE } = require("./config");
const { cryptoHash } = require("./server/util");
const Blockchain = require("./server/blockchain");
const blockchain = new Blockchain();

module.exports = {
  /*async insert(data) {
    this.getLast().then((lastBlock) => {
      let newBlock = blockchain.addBlock(lastBlock, data);
      console.log(newBlock);
      let timestamp = newBlock.timestamp;
      let lastHash = newBlock.lastHash;
      let hash = newBlock.hash;
      let difficulty = newBlock.difficulty;
      try {
        result = connection.query(`insert into block_table
        (timestamp, lastHash, hash, difficulty, data)
        values ($1, $2, $3, $4, $5)`,[timestamp, lastHash, hash, difficulty, data]);
        return result;
      } catch (error) {
        console.log("Error", error);
      }
    });
  },
  async getLast() {
    try {
      let lastBlocks = await connection.query(
        "select * from block_table order by timestamp desc limit 1"
      );
      const lastBlock = new Block(
        lastBlocks.rows[0].timestamp,
        "dummyHash",
        lastBlocks.rows[0].hash,
        lastBlocks.rows[0].difficulty,
        lastBlocks.rows[0].data
      );
      return lastBlock;
    } catch (error) {
      console.log("Error", error);
    }
  },*/
  async insert(newBlock){
    let timestamp = newBlock.timestamp;
    let lastHash = newBlock.lastHash;
    let hash = newBlock.hash;
    let difficulty = newBlock.difficulty;
    let data = newBlock.data;
    console.log(newBlock);
    try {
      result = connection.query(`insert into block_table
      (timestamp, lastHash, hash, difficulty, data)
      values ($1, $2, $3, $4, $5)`,[timestamp, lastHash, hash, difficulty, data]);
      return result;
    } catch (error) {
      console.log("Error", error);
    }
  },
  async obtainAll() {
    const results = await connection.query(
      "SELECT * FROM block_table order by timestamp desc"
    );
    return results;
  },
};
