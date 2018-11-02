const express = require('express')
const app = express()
var exphbs = require('express-handlebars')

app.engine('handlebars', exphbs({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

// MOCK ARRAY
let reviews = [
    { title: "Great Review", movieTitle: "Batman II"},
    { title: "Laaaame", movieTitle: "Titanic"}
]

// INDEX
app.get('/', (req, res) => {
    res.render('reviews-index', { reviews: reviews})
})

app.listen(3000, () => {
    console.log('App listening on port 3000!')
})
