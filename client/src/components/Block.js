import React, {Component} from "react";
const { Pool } = require('pg');
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});
const template = await pool.query('SELECT * FROM test_table');
class Block extends Component{
    render(){
        const {timestamp, hash, data} = this.props.block;

        /*const hashDisplay = `${hash.substring(0,15)}...`;
        const stringifiedData = JSON.stringify(data);

        const dataDisplay = stringifiedData.length>35 ? 
        `${stringifiedData.substring(0,35)}...`: stringifiedData;*/

        return(
            <div className="Block">
                <div>Hash: {hash}</div>
                <div>Timestamp: {new Date(timestamp).toLocaleString()}</div>
                <div>Data: {data}</div>
                <div>Array: {template.rows}</div>

            </div>
        )
    }
};

export default Block;