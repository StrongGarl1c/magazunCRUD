const express = require('express');

require('dotenv').config();
const { MongoClient } = require('mongodb');
// eslint-disable-next-line no-undef
const uri = process.env.API_URI;
const client = new MongoClient(uri, { useUnifiedTopology: true });

const router = express.Router();

// render page
router.get('/', (req, res) => {
  res.render('create', {
    title: 'welcome to magazunCRUD',
    name: req.params.name,
  });
});

router.post('/insert', (req, res) => {
  const towar = {
    name: req.body.name,
    origin: req.body.origin,
    price: req.body.price,
    type: req.body.type,
    quantity: req.body.quantity,
  };

  async function run() {
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
