const res = require('express/lib/response')

exports.handleInvalidPaths = (req, res) => {
    res.status(404).send({msg : 'Invalid Path'})
}