const express = require('express');
// const cors = require('cors');
const knex = require('knex');

//Middleware
const app = express();
app.use(express.json());
// app.use(cors());

//Db connection
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

//Config
const pageSize = 10;

// POST /api/v1/team
// Obtiene los jugadores de un equipo sin importar si se escribe en minúscula o mayúscula.
// Ejemplo de request:
// {
// “Name” : “real madrid”,
// “Page” : 1
// }
// Ejemplo de response:
// {
// “Page”: 1,
// “totalPages: 2
// “Items”: 10,
// “totalItems”:20,
// “Players” : [
// { name: “Marcelo”, “position”: “LB”, “nation” : “Brazil” },
// ...
// ]
// }

app.post('/api/v1/team', (req, res) => {
    const { team, page } = req.body;
    if (!!(team.trim()) && !!page) {
        db.select('name').from('players').where('team', 'ilike', `%${team}%`)
            .then(totalPlayers => {
                db.select('name', 'position', 'nation').from('players').where('team', 'ilike', `%${team}%`).offset((pageSize * page) - pageSize).limit(pageSize)
                    .then(players => {
                        res.json({
                            page,
                            totalPages: Math.ceil((totalPlayers.length / pageSize).toFixed(0)),
                            itemsInPage: players.length,
                            totalItems: totalPlayers.length,
                            players
                        });
                    }).catch(err => res.status(400).json('Error while getting team'))
            }).catch(err => res.status(400).json('Error while getting team'))
    } else {
        res.status(400).json('Bad Request');
    }
});


// GET /api/v1/players
// Busca los jugadores que contengan el String en los campos del nombre del jugador, ya sea una coincidencia parcial o total, y sin importar si es mayúscula o
// minúscula.
// El order puede ser asc o desc y define el orden a partir del nombre alfabéticamente, por default sera asc (si no se recibe en la url).
// Ejemplo: /api/v1/players?search=cristi&order=asc&page=1
// Respuesta:
// {
//     “Page”: 1,
//     “totalPages:1,
//     “Items”: 10,
//     “totalItems”:10,
//     “Players” : [
//     {name: “Cristiano Ronaldo”, “position”: “ST”, “nation” : “Portugal” , “team”: “Juventus” },
//     …
//     ]
//     }

app.get('/api/v1/players', (req, res) => {

});

app.listen(3010, () => {
    console.log('App is runnning on port 3010');
})
