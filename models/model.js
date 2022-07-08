const db = require("../db/connection")

selectAllCategories = () => {
    return db.query("SELECT * FROM categories;").then((categories) => {
        return categories.rows;
    })
};

selectReviewById = (id) => {
    return db.query(`SELECT reviews.*, COUNT(comments.comment_id) AS comment_count 
                     FROM reviews JOIN comments ON comments.review_id = reviews.review_id 
                     WHERE reviews.review_id = $1
                     GROUP BY comments.review_id, comments.comment_id, reviews.review_id;`, [id])
    .then((reviews) => {
        const review = reviews.rows[0];
        if (!review) {
          return Promise.reject({
            status: 404,
            msg: `No review found for review_id: ${id}`,
          });
        }
        return review;
    })
}

updateReviewById = (id, inc_votes) => {
    if (typeof inc_votes != "number") {
        return Promise.reject({
        status: 404,
        msg: `Invalid Packet`,
      });
    }
    if (isNaN(parseFloat(id))) {
        return Promise.reject({
        status: 404,
        msg: `Invalid ID`,
      });
    }
    return db.query(`UPDATE reviews SET votes = votes + $1 WHERE review_id = $2 RETURNING *;`, [inc_votes, id])
    .then((reviews) => {
        const review = reviews.rows[0];
        if (!review) {
          return Promise.reject({
            status: 404,
            msg: `No review found for review_id: ${id}`,
          });
        }
        return review;
    })
}

selectAllUsers = () => {
    return db.query("SELECT * FROM users;").then((users) => {
        return users.rows;
    })
};

selectAllReviews = () => {
    return db.query(`SELECT reviews.*, COUNT(comments.comment_id) AS comment_count 
                     FROM reviews JOIN comments ON comments.review_id = reviews.review_id 
                     GROUP BY comments.review_id, comments.comment_id, reviews.review_id
                     ORDER BY reviews.created_at DESC;`).then((reviews) => {
        return reviews.rows;
    })
};

selectReviewCommentsById = (id) => {
    if (isNaN(parseFloat(id))) {
        return Promise.reject({
        status: 404,
        msg: `Invalid ID`,
      });
    }
    return db.query(`SELECT * FROM reviews WHERE reviews.review_id = $1;`, [id]).then((reviews) => {
        if (!reviews.rows[0]) { return Promise.reject({ status: 404, msg: `No review found for review_id: ${id}`, })}}).then(() => {
            return db.query(`SELECT * FROM comments WHERE comments.review_id = $1;`, [id]).then((comments) => {
                return comments.rows;})
                  })
};

postReviewCommentById = (id, userComment) => {
  if (userComment === "invalid") return Promise.reject({status: 404, msg: "Invalid Packet"})
  if (isNaN(parseFloat(id))) return Promise.reject({status: 404, msg: `Invalid ID`,});

  const body = userComment.body
  const username = userComment.username
  console.log(userComment)
  return db.query(`SELECT * FROM reviews WHERE reviews.review_id = $1;`, [id]).then((reviews) => {
      if (!reviews.rows[0]) { return Promise.reject({ status: 404, msg: `No review found for review_id: ${id}`, })}}).then(() => {
        return db.query("INSERT INTO comments (author, body, review_id) VALUES ($1, $2, $3) RETURNING *;", [username, body, id])
            .then((comment) => {
                return comment.rows[0];
              })
      })
  
}