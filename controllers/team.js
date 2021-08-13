const { db } = require('../models/dbConnection');
const { config } = require('../config/config');
const { pageSize } = config;


const handleTeamSearch = (req, res) => {
    const { team, page: pageString } = req.body;
    const page = parseInt(pageString);
    if (!!(team?.trim()) && !!page) {
        db.select('name').from('players').where('team', 'ilike', `%${team}%`)
            .then(totalPlayers => {
                db.select('id', 'name', 'position', 'nation')
                    .from('players').where('team', 'ilike', `%${team}%`)
                    .offset((pageSize * page) - pageSize).limit(pageSize)
                    .then(players => {
                        res.json({
                            page,
                            totalPages: Math.ceil((totalPlayers.length / pageSize)),
                            itemsInPage: players.length,
                            totalItems: totalPlayers.length,
                            players
                        });
                    }).catch(err => res.status(400).json('Error while getting team'));
            }).catch(err => res.status(400).json('Error while getting team'));
    } else {
        res.status(400).json('Bad Request');
    }
};

module.exports = { handleTeamSearch };