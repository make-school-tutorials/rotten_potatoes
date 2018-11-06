module.exports = function(app, Review) {
    // INDEX
    app.get('/', (req, res) => {
        Review.find().then(reviews => {
            res.render('reviews-index', { reviews: reviews })
        }).catch(err => {
            console.log(err)
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
            res.redirect(`/reviews/${review._id}`)
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
            res.redirect(`/reviews/${review._id}`)
        })
        .catch(err => {
            console.log(err.message)
        })
    })

    // DELETE
    app.delete('/reviews/:id', function (req, res) {
        console.log("DELETE review")
        Review.findByIdAndRemove(req.params.id).then((review) => {
            res.redirect('/')
        }).catch((err) => {
            console.log(err.message)
        })
    })
}
