const express = require('express');
const objectId = require('mongodb').ObjectId;
const { MongoClient } = require('mongodb');
require('dotenv').config({ path: './config/.env' });

const router = express.Router();
const uri = process.env.API_URI;

// render page
router.get('/', (req, res) => {
  res.render('update', { title: 'Update By Id' });
});

// read from database
router.post('/submit', (req, res) => {
  // connect to db
  async function run() {
    const client = new MongoClient(uri, { useUnifiedTopology: true });
    await client.connect();
    const database = client.db('magazunCRUD');
    const collection = database.collection('tovar');

    const data = req.body;
    const query = { _id: objectId(data.id) };
    const update = {
      $set: {
        name: data.name,
        origin: data.origin,
        price: data.price,
        type: data.type,
        quantity: data.quantity,
      },
    };
    await collection.updateOne(query, update);
    await client.close();
    res.redirect('/read');
  }
  run().catch();
});

module.exports = router;
