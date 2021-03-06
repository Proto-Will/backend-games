require("../models/model")
const endpoints = require("../endpoints.json")


getEndpoints = (req, res) => {
      res.status(200).send({ endpoints })
}

getCategories = (req, res) => {
  selectAllCategories().then((categories) => {
      res.status(200).send({ categories })
    })
}

getReviewById = (req, res, next) => {
  const {review_id} = req.params;
  selectReviewById(review_id).then((review) => {
      res.status(200).send({ review })
    }).catch((err) => {
      next(err)
    })
}

patchReviewById = (req, res, next) => {
  const {review_id} = req.params;
    let {inc_votes} = req.body;
    if (!inc_votes) inc_votes = "invalid"
    updateReviewById(review_id, inc_votes).then((review) => {
      res.status(200).send({ review })
    }).catch((err) => {
      next(err)
    })
}

getUsers = (req, res) => {
  selectAllUsers().then((users) => {
      res.status(200).send({ users })
    })
}

getReviews = (req, res) => {
  selectAllReviews().then((reviews) => {
      res.status(200).send({ reviews })
    })
}

getReviewComments = (req, res, next) => {
  const {review_id} = req.params;
  selectReviewCommentsById(review_id).then((comments) => {
    res.status(200).send({ comments })
    }).catch((err) => {
      next(err)
    })
}

postReviewComment = (req, res, next) => {
  const {review_id} = req.params;
    let userComment = req.body;
    if (!userComment.body) userComment = "invalid"
    postReviewCommentById(review_id, userComment).then((comment) => {
      res.status(201).send({ comment })
    }).catch((err) => {
      next(err)
    })
}