const express = require('express');
const cors = require('cors');
const { handleTeamSearch } = require('./controllers/team');
const { handlePlayersSearch } = require('./controllers/players');

const app = express();
//Middleware
app.use(express.json());
app.use(cors());

//Default verification
app.get('/', (req, res) => { res.send('It is working!') });
//Team Endpoint
app.post('/api/v1/team', (req, res) => { handleTeamSearch(req, res) });
//Players Endpoint
app.get('/api/v1/players', (req, res) => { handlePlayersSearch(req, res) });

//Start server
app.listen(3010, () => console.log('App is runnning on port 3010'));
