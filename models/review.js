const mongoose = require('mongoose')

const Review = mongoose.model('Review', {
    reviewTitle: String,
    movieTitle: String,
    description: String,
    rating: Number
})

module.exports = Review
