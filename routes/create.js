const express = require("express");
const router = express.Router();

// render page
router.get("/", (req, res) => {
  res.render("create", {
    title: "welcome to magazunCRUD"
  });
});

// post request handler
router.post("/create", (req, res) => {
  const id = req.body.id;
  res.render("create", {
    title: "welcome to magazunCRUD",
    inputData: req.body.id
  });
});

module.exports = router;
