const express = require('express')
const methodOverride = require('method-override')
const app = express()

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }));

app.use(methodOverride('_method'))

const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/rotten-potatoes')

const Review = mongoose.model('Review', {
    reviewTitle: String,
    movieTitle: String,
    description: String,
    rating: String
})

var exphbs = require('express-handlebars')

app.engine('handlebars', exphbs({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

// INDEX
app.get('/', (req, res) => {
    Review.find()
        .then(reviews =>{
            res.render('reviews-index', { reviews: reviews})
        })
        .catch(err => {
            console.log(err);
        })
})

// NEW
app.get('/reviews/new', (req, res) => {
    res.render('reviews-new', {});
})

// SHOW
app.get('/reviews/:id', (req, res) => {
    Review.findById(req.params.id).then((review) => {
        res.render('reviews-show', { review: review })
    }).catch((err) => {
        console.log(err.message);
    })
})

// CREATE
app.post('/reviews', (req, res) => {
    Review.create(req.body).then((review) => {
        console.log(review);
        res.redirect('/reviews/${review._id}')
    }).catch((err) => {
        console.log(err.message)
    })
    // res.render('reviews-new', {});
})

// EDIT
app.get('/reviews/:id/edit', (req, res) => {
    Review.findById(req.params.id, function(err, review) {
        res.render('reviews-edit', { review: review })
    })
})

// UPDATE
app.put('/reviews/:id', (req, res) => {
    Review.findByIdAndUpdate(req.params.id, req.body).then(review => {
        res.redirect('/reviews/${review._id}')
    })
    .catch(err => {
        console.log(err.message)
    })
})

app.listen(3000, () => {
    console.log('App listening on port 3000!')
})
