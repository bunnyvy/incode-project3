const express = require('express')
const app = express()
const data = require('./data') // const {users, posts} = require('./data')
require('bcryptjs')
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
app.get('/users', (req, res) => {
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

app.get('/posts/:id', (req,res) => { // the "id" in posts/:id must be the same as req.params.id
    res.send(req.params.id) // send request parameters in id 
})

// POST rquest
app.listen(PORT, () => {
    console.log(`You're doing amazing! App is listening at http://localhost:${PORT}`)
})

// EJS Tags
// <% 
// <%= outputs the value into the template
// <%- outputs the unescape