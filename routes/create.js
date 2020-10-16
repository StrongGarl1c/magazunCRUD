const express = require('express');
require('dotenv').config({ path: '../config/.env' });
const { MongoClient } = require('mongodb');

const uri = process.env.API_URI;
const router = express.Router();

// render page
router.get('/', (req, res) => {
  res.render('create', { title: 'Create' });
});

// insert data
router.post('/insert', (req, res) => {
  const towar = {
    name: req.body.name,
    origin: req.body.origin,
    price: req.body.price,
    type: req.body.type,
    quantity: req.body.quantity,
  };

  async function run() {
    const client = new MongoClient(uri, { useUnifiedTopology: true });
    await client.connect();
    const database = client.db('magazunCRUD');
    const collection = database.collection('tovar');
    collection.insertOne(towar, () => {
      client.close();
    });
    res.redirect('/create');
  }
  run().catch();
});

module.exports = router;
