const express = require('express')
const data = require('./data')
const app = express()
const PORT = 3000
const message = "Hello Incode 5"
console.log(data.schedules[0])

// GET request - route
app.get('/', (req, res) => {
    res.send(message)
})

// POST request

app.listen(PORT, () => {
    console.log(`You guys are doing great, keep it up! Here's your app: http://localhost:${PORT}`)
  })
