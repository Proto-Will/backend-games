require("../models/model")

getCategories = (req, res) => {
        res.status(200).send(selectAllCategories())
}