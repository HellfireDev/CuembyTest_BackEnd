const { db } = require('../models/dbConnection');
const { orderBy } = require('../helpers/orderBy');
const { config } = require('../config/config');
const { pageSize } = config;

const handlePlayersSearch = (req, res) => {
    const { search, order, page: pageString } = req.query;
    const page = parseInt(pageString);
    //If no search param or its value is specified, API returns all players in db, sorted as per requirements
    if (!!page && !(search?.trim())) {
        db.select('name').from('players')
            .then(totalMatches => {
                db.select('id', 'name', 'position', 'nation', 'team')
                    .from('players')
                    .orderBy('name', orderBy(order))
                    .offset((pageSize * page) - pageSize).limit(pageSize)
                    .then(players => {
                        res.json({
                            page,
                            totalPages: Math.ceil((totalMatches.length / pageSize)),
                            itemsInPage: players.length,
                            totalItems: totalMatches.length,
                            players
                        });
                    }).catch(err => {
                        console.log(err);
                        res.status(400).json('Error while getting players');
                    });
            }).catch(err => {
                console.log(err);
                res.status(400).json('Error while getting players');
            });
        //If search param is specified, proceed as requested in test
    } else if (!!page && !!(search?.trim())) {
        db.select('name').from('players').where('name', 'ilike', `%${search}%`)
            .then(totalMatches => {
                db.select('id', 'name', 'position', 'nation', 'team')
                    .from('players').where('name', 'ilike', `%${search}%`)
                    .orderBy('name', orderBy(order))
                    .offset((pageSize * page) - pageSize).limit(pageSize)
                    .then(players => {
                        res.json({
                            page,
                            totalPages: Math.ceil((totalMatches.length / pageSize)),
                            itemsInPage: players.length,
                            totalItems: totalMatches.length,
                            players
                        });
                    }).catch(err => {
                        console.log(err);
                        res.status(400).json('Error while searching');
                    });
            }).catch(err => {
                console.log(err);
                res.status(400).json('Error while searching');
            });
    } else {
        res.status(400).json('Bad Request');
    }
};

module.exports = { handlePlayersSearch };