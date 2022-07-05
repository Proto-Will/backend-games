const db = require("../db/connection")

selectAllCategories = () => {
    return db.query("SELECT * FROM categories;").then((categories) => {
        return categories.rows;
    })
};

selectReviewById = (id) => {
    return db.query(`SELECT * FROM reviews WHERE review_id = $1;`, [id])
    .then((review) => {
        return review.rows[0];
    })
}

updateReviewById = (id, inc_votes) => {
    return db.query(`UPDATE reviews SET votes = votes + $1 WHERE review_id = $2 RETURNING *;`, [inc_votes, id])
    .then((review) => {
        return review.rows[0];
    })
}