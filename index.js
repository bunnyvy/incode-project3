const express = require('express')
const app = express()
const data = require('./data') // const {users, posts} = require('./data')
require('bcryptjs')
const PORT = process.env.PORT || 3000

// Body Parser
app.use(express.json())
app.use(express.urlencoded({extended: false}))

// Set my template engine as EJS
app.set('view engine', 'ejs')
// app.set('views', './example') // set the views folder to a different name

// Set public folder as our static folder
app.use(express.static('public'))

// Homepage
app.get('/', (req, res) => {
    res.render('pages/index', {
        users: data.users //inside whatever file look at the variable users
    })
})

// NewUsers
app.get('/', (req, res) => {
    res.render('pages/newusers')
})

// Users
app.get('/', (req, res) => {
    res.render('pages/users')
})

// Schedule
app.get('/', (req, res) => {
    res.render('pages/schedule')
})

// NewSchedule
app.get('/', (req, res) => {
    res.render('pages/newschedule')
})

// Displays all users
app.get('/users', (req, res) => {
    console.log(data.users)
    res.render('pages/users', {
        users: data.users,
    })
    // res.json(data.users)
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

// Display a single user
app.get('/users/:id', (req,res) => {
    
    //const found = data.users.some(user => user.id === Number(req.params.id))
    //if (found) {
        //const users = data.users.filter(user => user.id === Number(req.params.id))
        res.render('pages/singleuser')
    //} else {
    //    res.send('users not found')
    //}
})

// POST rquest
app.listen(PORT, () => {
    console.log(`You're doing amazing! App is listening at http://localhost:${PORT}`)
})

// EJS Tags
// <% 
// <%= outputs the value into the template
// <%- outputs the unescape