const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Comment = mongoose.model('Comment', {
    title: String,
    content: String,
    reviewID: { type: Schema.Types.ObjectId, ref: 'Review' }
})

module.exports = Comment
