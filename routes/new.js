const express = require('express')
const router = express.Router()
const db = require('../database')

router.get('/', (req, res) => {
    res.render('pages/newschedules')
})

router.post('/', (req, res) => {
    console.log(req.body)
    db.none('INSERT INTO users(firstname, lastname, email, day_of_week, start_at, end_at) VALUES($1, $2, $3, $4, $5, $6);', [req.body.firstname, req.body.lastname, req.body.email, req.body.day, req.body.start_at, req.body.end_at])
      .then(()=> {
        res.redirect('/')
      })
      .catch(error => {
        console.log(error)
        res.send(error)
      })
    })

module.exports = router;