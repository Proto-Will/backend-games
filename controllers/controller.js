require("../models/model")


getCategories = (req, res) => {
  selectAllCategories().then((categories) => {
      res.status(200).send({ categories })
    })
}


