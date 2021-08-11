const knex = require('knex');

const db = knex({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: 'postgres',
        password: 'blue',
        database: 'cuemby_db',
        charset: 'utf8'
    }
});

module.exports = { db };