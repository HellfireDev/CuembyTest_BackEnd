const fetch = require('node-fetch');
const knex = require('knex');

//Get dataset from FUT21 API and save it to App Db
//The FUT21 API provides several repeated records. This script ignores that fact and just replicates data.
const populateDb = async () => {
    try {
        const initialDataSet = await fetch('https://www.easports.com/fifa/ultimate-team/api/fut/item');
        const { totalPages } = await initialDataSet.json();
        console.log(totalPages);
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

        let i = 1;
        while (i <= totalPages) {
            let dataPerPage = await fetch(`https://www.easports.com/fifa/ultimate-team/api/fut/item?page=${i}`);
            let { items } = await dataPerPage.json();
            let dataToInsert = items.map(player => {
                return {
                    name: player.commonName || (player.firstName + ' ' + player.lastName),
                    position: player.position,
                    nation: player.nation.name,
                    team: player.club.name
                }
            });
            let insertionResult = await db('players').insert(dataToInsert).returning('id');
            console.log(insertionResult);
            i++;
        }
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
    console.log('Data retrieved and stored successfully!');
    process.exit(0);
}


populateDb();

