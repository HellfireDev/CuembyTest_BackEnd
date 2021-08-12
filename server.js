const express = require('express');
const cors = require('cors');
const { handleTeamSearch } = require('./controllers/team');
const { handlePlayersSearch } = require('./controllers/players');
const { apiKeyAuth } = require('@vpriem/express-api-key-auth');

const app = express();
//Middleware
app.use(express.json());
app.use(cors());
//x-api-header verification, example to launch server: $ CUEMBY_API_KEY_1='myapikeystring' node server.js
app.use(apiKeyAuth([process.env.CUEMBY_API_KEY_1 || 'super'])); //hardcoding an API KEY value in case it's not provided on services startup

//Default verification
app.get('/', (req, res) => { res.send('It is working!') });
//Team Endpoint
app.post('/api/v1/team', (req, res) => { handleTeamSearch(req, res) });
//Players Endpoint
app.get('/api/v1/players', (req, res) => { handlePlayersSearch(req, res) });

//Start server
app.listen(process.env.PORT || 3010, () => console.log(`App is runnning on port ${process.env.PORT || 3010}`));
