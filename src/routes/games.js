'use strict';
var express=require("express");
var router = express.Router();
const service = require('../services/games');


const checkGameExists = function(id, res, callback) {
    const game = service.get(id);
    if (game) {
        callback(game);
    } else {
        res.status(404).send('Non-existent game ID');
    }
}

router.post('/', function(req, res, next) {
    const word = req.body.word;
    if (word && /^[A-Za-z]{3,}$/.test(word)) {
        var game=service.create(req.user.id, word);
        // res.redirect('/');
        res.redirect(`/games/${game.id}/created`);
    } else {
        res.status(400).send('Word must be at least three characters long and contain only letters');
    }
});


router.get('/:id/created', function(req, res, next) {
    checkGameExists(
        req.params.id,
        res,
        game => res.render('createdGame', game));
});

router.get('/:id', function(req, res, next) {
    checkGameExists(
        req.params.id,
        res,
        game => res.render('game', {
            length: game.word.length,
            id: game.id
        }));
});

router.post('/:id/guesses', function(req, res, next) {
    checkGameExists(
        req.params.id,
        res,
        game => {
            res.send({
                positions: game.positionsOf(req.body.letter)
            });
        }
    );
});


router.delete('/:id', function(req, res, next) {
    checkGameExists(
        req.params.id,
        res,
        game => {
            if (game.setBy === req.user.id) {
                game.remove();
                res.send();
            } else {
                res.status(403).send("You don't have permission to delete this game");
            }
        }
    );
});

module.exports = router;