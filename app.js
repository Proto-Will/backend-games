const express = require('express');
require('./controllers/controller');

const app = express();
app.use(express.json());



app.get('/api/categories', getCategories);
app.get('/api/reviews/:review_id', getReviewById);



app.all('*', (req, res) => {
    res.status(404).send({msg: "404 not found"})
})

app.use((err, req, res, next) => {
    console.log(err)
    res.status(500).send({ msg : "internal server error"})
})

module.exports = app;
