const express = require('express')
const app = express()
const data = require('./data 2') // const {users, posts} = require('./data')
const bcrypt = require('bcryptjs')
const PORT = process.env.PORT || 3000

// Body Parser
app.use(express.json())
app.use(express.urlencoded({extended: false}))

// Set view engine as EJS
app.set('view engine', 'ejs')

// Set our static folder
app.use(express.static('public'))

// Homepage
app.get('/', (req, res) => {
    res.render('index', {
        name: "Vei"
    })
})

// Displays all users
app.get('/', (req, res) => {
    res.json(data.users)
})

// Adds a new user
app.post('/users', (req, res) => {
    const {firstname, lastname, email, password} = req.body
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(password, salt)
    const newUser = {
        firstname,
        lastname,
        email,
        password: hash
    }

    data.users.push(newUser)
    res.json(data.users)
})

// Display a single post
app.get('/posts/:id', (req,res) => {
    const found = data.posts.some(post => post.id === Number(req.params.id))
    if (found) {
        const post = data.posts.filter(post => post.id === Number(req.params.id))
        res.send(post[0])
    } else {
        res.send('Post not found')
    }
})

// Way 1: loops to show all schedules of one particular user ID
// app.get('/users/:id/schedules', (req, res) => {
    // grab all the posts of a particular user
    // make an empty array to store all the schedules that match
    // let usersSchedules = []
    // loop through all posts
    // for (let i=0; i < data.schedules.length; i++) {
        // if users_id of schedule is the same as ID in the path, add to usersSchedule
        // if (data.schedules[i].user_id === Number(req.params.id)) {
          //  usersSchedules.push(data.schedules[i])
        // }
   // }
  //  res.json(usersSchedules)
// })

// Way 2: filter to show all schedules of one particular user ID
app.get('/users/:id/schedules', (req, res) => {
const usersSchedules = data.schedules.filter(schedules => schedules.user_id === Number(req.params.id))
res.json(usersSchedules)
})

// POST rquest
app.listen(PORT, () => {
    console.log(`You're doing amazing! App is listening at http://localhost:${PORT}`)
})

// Difference between send and json
// most of the time, they are fairly identical
// res.json has the added advantage where if the thing you're sending isn't originally json object, it will pass it for you 
// most of the time, you will see res.json more than res.send in APIs