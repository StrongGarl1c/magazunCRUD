const express = require('express');

const router = express.Router();

// render page
router.get('/', (req, res) => {
  res.render('index', { title: 'magazunCRUD' });
});

module.exports = router;
