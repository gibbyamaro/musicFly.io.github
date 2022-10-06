const express = require('express');
const { default: mongoose } = require('mongoose');
//const songs = require('../models/songs');
const router = express.Router();

const Song = require('../models/songs');


//get routes starts here
router.get('/', (req, res)=> {
    Song.find({})
        .then(song => {
            res.render('index', {song : song});
        })
        .catch(err=> {
            req.flash('error_msg', 'ERROR: '+err)
            res.redirect('/');
        })
    
});

router.get('/song/new', (req,res)=> {
    res.render('new');
});

router.get('/song/search', (req,res)=> {
    res.render('search', {song:" "});
});

router.get('/song', (req,res)=> {
    let searchQuery = {title : req.query.title };

    Song.findOne(searchQuery)
        .then(song => {
            console.log(song.title);
            res.render('search', {song:song});
        })
        .catch(err => {
            req.flash('error_msg', 'ERROR: '+err)
            res.redirect('/');
        });

});


router.get('/edit/:id', (req, res)=> {

    let searchQuery = {_id : req.params.id};
    Song.findOne(searchQuery)
        .then(song => {
            res.render('edit', {song:song});
        })
        .catch(err => {
            req.flash('error_msg', 'ERROR: '+err)
            res.redirect('/');
        });

});

//get routes ends here


//post routes starts here
router.post('/song/new', (req,res)=> {
    let newSong = {
        title: req.body.title,
        artist : req.body.artist,
        genre : req.body.genre,
        link : req.body.link,
    };

    Song.create(newSong)
        .then(song => {
            req.flash('success_msg', 'Song data added to database successfully.')
            res.redirect('/');
        })
        .catch(err => {
            req.flash('error_msg', 'ERROR: '+err)
            res.redirect('/');
        });
});

//post routes end here

//put routes starts here

router.put('/edit/:id', (req, res)=> {
    let searchQuery = {_id : req.params.id};

    Song.updateOne(searchQuery, {$set: {
        title : req.body.title,
        artist : req.body.artist,
        genre : req.body.genre,
        link : req.body.link
    }})
    .then(song => {
        req.flash('success_msg', 'Song data updated successfully.')
        res.redirect('/');
    })
    .catch(err => {
        req.flash('error_msg', 'ERROR: '+err)
        res.redirect('/');
    });
});

//put routes ends here


//delete routes starts here
router.delete('/delete/:id', (req, res)=> {
    let searchQuery = {_id : req.params.id};

    Song.deleteOne(searchQuery)
        .then(song=>{
            req.flash('success_msg', 'Song deleted successfully.')
            res.redirect('/');
        })
        .catch(err => {
            req.flash('error_msg', 'ERROR: '+err)
            res.redirect('/');
        });
});

//delete routes ends here
module.exports = router;