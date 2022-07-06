const express = require('express');
require('./controllers/controller');

const app = express();
app.use(express.json());



app.get('/api/categories', getCategories);
app.get('/api/reviews/:review_id', getReviewById);
app.patch('/api/reviews/:review_id', patchReviewById);
app.get ('/api/users', getUsers);


app.all('*', (req, res) => {
    res.status(404).send({msg: "Invalid Path"})
})

app.use((err, req, res, next) => {
    if (err.status && err.msg) {
        res.status(err.status).send({ msg: err.msg })
    } else {
        next(err)
    }
})

app.use((err, req, res, next) => {
    console.log(err)
    res.status(500).send({ msg : "internal server error"})
})

module.exports = app;
