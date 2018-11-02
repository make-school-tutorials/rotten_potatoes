const express = require('express')
const app = express()

const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/rotten-potatoes')

const Review = mongoose.model('Review', {
    title: String,
    movieTitle: String
})

var exphbs = require('express-handlebars')

app.engine('handlebars', exphbs({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

// MOCK ARRAY
//let reviews = [
//    { title: "Great Review", movieTitle: "Batman II"},
//    { title: "Laaaame", movieTitle: "Titanic"},
//    { title: "Best Movie Ever!", movieTitle: "Hot Rod"}
//]

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

app.listen(3000, () => {
    console.log('App listening on port 3000!')
})
