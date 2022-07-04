const db = require("../db/connection")

selectAllCategories = () => {
    return db.query("SELECT * FROM categories;").then((categories) => {
        return categories.rows;
    })
};