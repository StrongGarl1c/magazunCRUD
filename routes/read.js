const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
    res.send("<h1>read.js</h1>");
});

module.exports = router;



// // read from database
// router.get("/", (req, res) => {
// let arr = [];
// // const sort = { score: 1 };
// // const limit = 15;
// // const projection = { _id: 0, name: 1, score: 1 };
// // const cursor = collection.find().project(projection);
// // cursor.sort(sort);
// // cursor.limit(limit);
// const cursor = collection.find({});
// cursor.forEach(
//     (elem) => {
//     arr.push(elem);
//     },
//     () => {
//     res.json(arr);
//     }
// );
// });