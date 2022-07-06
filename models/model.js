const db = require("../db/connection")

selectAllCategories = () => {
    return db.query("SELECT * FROM categories;").then((categories) => {
        return categories.rows;
    })
};

selectReviewById = (id) => {
    return db.query(`SELECT * FROM reviews WHERE review_id = $1;`, [id])
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