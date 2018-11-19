const Comment = require('../models/comment.js')
const Review = require('../models/review.js')

//Create Comment
module.exports = function(app) {

    app.post('/reviews/comments', (req, res) => {
        Comment.create(req.body).then(comment => {
            console.log(comment)
            res.redirect(`/reviews/${comment.reviewID}`)
        }).catch((err) => {
            console.log(err.message)
        })
    })

    app.delete('/reviews/comments/:id', function (req, res) {
        console.log("Delete comment")
        Comment.findByIdAndRemove(req.params.id).then((comment) => {
            res.redirect(`/reviews/${comment.reviewID}`)
        }).catch((err) => {
            console.log(err.message)
        })
    })
}
