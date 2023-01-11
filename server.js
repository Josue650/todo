// server.js
require('dotenv').config()
/* This lets me take the values from my .env file
and inject it them into process.env
My .env should have a MONGO_URI which will come from my
MongoDB cloud provider*/

require('./config/database')
/* Running this will connect our database to our MERN app */
const express = require('express')
const app = express()
/* Create an application object that we can use to build our
    API that will connect to our React App
*/
const path = require('path')
const favicon = require('serve-favicon')
const logger = require('morgan')
const PORT = process.env.PORT || 3001

// middleware
app.use(express.json()) // req.body
app.use((req, res, next) => { // makes sure that obj exists
    res.locals.data = {}
    next()
})
app.use(logger('dev'))
app.use(favicon(path.join(__dirname, 'build', 'favicon.ico' )))
app.use(express.static(path.join(__dirname, 'build')))


 app.use('/api/todos', require("./routes/api/todos"))// // <====== Finish code once you got it


app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

app.listen(PORT, () => {
    console.log(`I am listening on ${PORT} we made it`)
})
