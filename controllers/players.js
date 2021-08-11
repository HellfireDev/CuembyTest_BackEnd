const { db } = require('../models/dbConnection');
const { orderBy } = require('../helpers/orderBy');
const { config } = require('../config/config');
const { pageSize } = config;

const handlePlayersSearch = (req, res) => {
    const { search, order, page } = req.query;
    if (!!(search.trim()) && !!page) {
        db.select('name').from('players').where('name', 'ilike', `%${search}%`)
            .then(totalMatches => {
                db.select('name', 'position', 'nation', 'team')
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