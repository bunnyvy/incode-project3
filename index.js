const express = require('express')
const app = express()
const data = require('./data') // const {users, posts} = require('./data')
const bcrypt = require('bcrypt') 
const PORT = process.env.PORT || 8000
const db = require('./database')
const homeRouter = require('./routes/home')
const newRouter = require('./routes/new')

// Body Parser Middleware
app.use(express.json())
app.use(express.urlencoded({extended: false})) // handles form
// ^^ when you received folder in, it will accept or reject the nested objects 
//e.g. {"name":"vei", name:"vei"} --> only accepting the upper nest "parents", false is rejected those "grandchildren"

// Set my template engine as EJS
app.set('view engine', 'ejs')
// app.set('views', './example') // set the views folder to a different name

// Set public folder as our static folder
app.use(express.static('public'));
app.use('/', homeRouter)
app.use('/new', newRouter)

// a route "/new" to display a schedule form and form data
// getting schedules and new schedules
app.get('/schedules', (req, res) => {
    db.any('SELECT * FROM schedules;')
    .then(users => {
        console.log(schedules)
        res.render('pages/schedules', {
        posts: schedules
        })
    })
    .catch(error => {
        console.log(error)
        res.send(error)
    })
  })
  app.get('/newschedules', (req, res) => {
    res.render('pages/newschedules')
  })
  app.post('/newschedules', (req, res) => {
      console.log(req.body)
      db.none('INSERT INTO users(firstname, lastname, email, start_at, last_at) VALUES($1, $2, $3, $4, $5);', [req.body.firstname, req.body.lastname, red.body.email, req.body.start_at, req.body.end_at])
      .then(()=> {
          res.redirect('/schedules')
      })
      .catch(error => {
          console.log(error)
          res.send(error)
      })
    })

// Adds a new schedule
app.get('/new', (req, res) => {
    const users=data.users
    res.render('pages/newschedules', {users})
})

app.post('/new',(req,res) => {
    const {user_id, day, start_at, end_at} = req.body
    const newSch = {
        user_id,
        day,
        start_at,
        end_at
    }
data.schedules.push(newSch)
//res.json(data.schedules)
res.redirect('/schedules')
})

// PORT rquest
app.listen(PORT, () => {
    console.log(`You're doing amazing! App is listening at http://localhost:${PORT}`)
})