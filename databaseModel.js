const connection = require("./connection");
module.exports = {
    async insert(data){
        let lastHash = obtainLastHash();


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