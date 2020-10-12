const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.render("../public/create")
});

// router.get("/", (req, res, next) => {
//     res.send("<h1>create.js</h1>");
// });

module.exports = router;