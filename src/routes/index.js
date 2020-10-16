const express = require('express');

const router = express.Router();

// render page
router.get('/', (req, res) => {
  res.render('index', { title: 'Welcome to magazunCRUD' });
});

module.exports = router;
