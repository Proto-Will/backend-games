const express = require('express');
require('./controllers/controller');

const app = express();
app.use(express.json());

app.use((err, req, res, next) => {
    if(err) console.log(err)
    else next()
})

app.get('/api/categories', getCategories);

app.use((err, req, res, next) => {
    console.log(err)
    res.status(500).send({ msg : "internal server error"})
})

module.exports = app;
