require("../models/model")


getCategories = (req, res) => {
  selectAllCategories().then((categories) => {
    console.log(categories)
      res.status(200).send({ categories })
    })
}
