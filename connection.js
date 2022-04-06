
const { Pool } = require('pg');
const pool = new Pool({
    user: 'drqcjolywcqrrg',
    host: 'ec2-18-214-134-226.compute-1.amazonaws.com',
    database: 'd468des2v2an2m',
    password: 'aace6136193085d3d19247e47a11d284ecc057e8864bd3f70af0bdb93565f924',
    port: 5432,
    ssl: {
        rejectUnauthorized: false
    }
});
module.exports = pool;