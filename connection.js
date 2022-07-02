
const { Pool } = require('pg');
const pool = new Pool({
    user: 'rxuidxpnfispfk',
    host: 'ec2-44-198-82-71.compute-1.amazonaws.com',
    database: 'd38kjrg9ou59rg',
    password: 'dacb19b9d45bd712341d7c5eeaa2d5cf335d9aa01a685e7c8996d8e6638d47c6',
    port: 5432,
    ssl: {
        rejectUnauthorized: false
    }
});
module.exports = pool;