import React, {Component } from 'react';
const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

class pruebaDB extends Component{
        client = await pool.connect();
        result = await client.query('SELECT * FROM test_table');
        results = { 'results': (result) ? result.rows : null};

        render(){
            this.results.array.forEach(element => {
            return(<div>
                Aceituna
            </div>)
            });

        }
}
