const express = require('express')
const router = express.Router()
const data = require('../data') // const {users, posts} = require('./data')
const bcrypt = require('bcrypt') 
const PORT = process.env.PORT || 8000
const db = require('../database')


// Displays all schedule
router.get('/', (req, res) => {
    db.any('SELECT * FROM users;')
    .then(function(databasedata) {
        console.log(databasedata)
        res.render('pages/schedules', {
        schedules: databasedata,
    })
        // success;
    })
    .catch(function(error) {
        console.log(error)
        res.render('pages/error', {
            error,
        })
    });
}) 

module.exports = router;