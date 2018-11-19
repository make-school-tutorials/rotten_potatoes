const express = require('express')
const methodOverride = require('method-override')
const app = express()

module.exports = app

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'))

app.use(methodOverride('_method'))

const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/rotten-potatoes')

const Review = require('./models/review')
const reviews = require('./controllers/reviews')(app, Review)

const Comment = require('./models/comment')
const comments = require('./controllers/comments')(app)

var exphbs = require('express-handlebars')

app.engine('handlebars', exphbs({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

app.listen(3000, () => {
    console.log('App listening on port 3000!')
})
