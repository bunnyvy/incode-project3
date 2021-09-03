const express = require('express')
const app = express()
const data = require('./data') // const {users, posts} = require('./data')
require('bcryptjs')
const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`App is listening on http://localhost:${PORT}`)) // post request
const db = require('./database')

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

// Homepage
app.get('/', (req, res) => {
    res.render('pages/index', { //go to pages folder and go to index file
        users: data.users
    })
})

// Getting posts and new posts
app.get('/posts', (req, res) => {
    db.any('SELECT * FROM users;')
    .then(posts => {
        console.log(posts)
        res.render('pages/posts', {
        posts
        })
    })
    .catch(error => {
        console.log(error)
        res.send(error)
    })
  })
  
  app.get('/newposts', (req, res) => {
    res.render('pages/newposts')
  })

  app.post('/newposts', (req, res) => {
      console.log(req.body)
      db.none('INSERT INTO users(name, post) VALUES($1, $2);', [req.body.name, req.body.post])
      .then(()=> {
          res.redirect('/posts')
      })
      .catch(error => {
          console.log(error)
          res.send(error)
      })
    })

// Displays all users
app.get('/users', (req, res) => {
    console.log(data.users)
    res.render('pages/users', {
        users: data.users,
    })
    // res.json(data.users)
}) 

//Add new Schdule
app.post('schedules',(req,res) => {
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
    //res.json(data.users)
    res.redirect('/users')
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

// EJS Tags
// <% 
// <%= outputs the value into the template
// <%- outputs the unescape