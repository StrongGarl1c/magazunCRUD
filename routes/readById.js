const express = require('express');
const objectId = require('mongodb').ObjectId;

const router = express.Router();
require('dotenv').config();
const { MongoClient } = require('mongodb');
// eslint-disable-next-line no-undef
const uri = process.env.API_URI;

// render page
router.get('/', (req, res) => {
  res.render('readById');
});

// read from database
router.post('/submit', (req, res) => {
  // connect to db
  async function run() {
    const client = new MongoClient(uri, { useUnifiedTopology: true });
    await client.connect();
    const database = client.db('magazunCRUD');
    const collection = database.collection('tovar');

    const { id } = req.body;
    const dataArray = await collection.findOne({ _id: objectId(id) });
    await client.close();
    res.render('readById', { someData: dataArray });
  }
  run().catch();
});

module.exports = router;
