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

// Display a single user
app.get('/users/:id', (req,res) => {
    const { id } = req.params;
    const found = data.users.find((user, index) => index === Number(id))
    if (found) {
        res.render('pages/singleuser', { found, id })
    } else {
        res.send('users not found')
    }
})

// Displays all schedule
app.get('/schedules', (req, res) => {
    console.log(data.schedules)
    res.render('pages/schedules', {
        schedules: data.schedules,
    })
}) 

// Display schedule for a single user
app.get('/users/:id/schedules', (req, res) => {
    let schedule = []
    for (let i=0; i<data.schedules.length; i++){
        if (data.schedules[i].user_id === Number(req.params.id)){
            schedule.push(data.schedules[i])
        }
    }
    console.log(schedule)
    res.send(schedule)
});

// Adds a new user
app.post('/newusers', (req, res) => {
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

// Adds a new schedule
app.post('/newschedules',(req,res) => {
    const {user_id,day,start_at,end_at} = req.body
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

// EJS Tags
// <% 
// <%= outputs the value into the template
// <%- outputs the unescape