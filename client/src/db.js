import React from 'react';
import { render } from 'react-dom';
import App from'./components/App';
/*const { Pool } = require('pg');

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    }
  });

  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM test_table');
    const results = { 'results': (result) ? result.rows : null};
    client.release();
    } catch (err) {
      console.error(err);
      res.send("Error " + err);
}*/

render(
    <App />, 
    document.getElementById('root')
    );

