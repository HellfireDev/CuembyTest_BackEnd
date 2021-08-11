const knex = require('knex');

//Create a local PostgreSQL DB
const base_db = knex({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: 'postgres',
        password: 'blue',
        database: 'postgres',
        charset: 'utf8'
    }
});

const createDb = () => {
    return new Promise((resolve, reject) => {
        base_db.raw('CREATE DATABASE cuemby_db;')
            .then(() => resolve('DB successfuly created!'))
            .catch(reject);
    })
};

const createTable = () => {
    return new Promise((resolve, reject) => {
        const cuemby_db = knex({
            client: 'pg',
            connection: {
                host: '127.0.0.1',
                user: 'postgres',
                password: 'blue',
                database: 'cuemby_db',
                charset: 'utf8'
            }
        });

        cuemby_db.schema.createTable('players', table => {
            table.increments('id');
            table.string('name', 100).notNullable();
            table.string('position', 50).notNullable();
            table.string('nation', 50).notNullable();
            table.string('team', 100).notNullable();
        }).then(() => resolve('Table successfully created!')
        ).catch(error => {
            base_db.raw('DROP DATABASE cuemby_db');
            reject(error);
        });
    })
};


const runScript = async () => {
    try {
        const runCreateDb = await createDb();
        console.log(runCreateDb);
        const runCreateTable = await createTable();
        console.log(runCreateTable);
        process.exit(0);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

runScript();






