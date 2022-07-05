require("../models/model")


getCategories = (req, res) => {
  selectAllCategories().then((categories) => {
      res.status(200).send({ categories })
    })
}

getReviewById = (req, res) => {
  const {review_id} = req.params;
  selectReviewById(review_id).then((review) => {
      res.status(200).send({ review })
    })
}