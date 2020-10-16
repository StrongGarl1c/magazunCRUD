const express = require('express');
const objectId = require('mongodb').ObjectId;
require('dotenv').config({ path: './config/.env' });
const { MongoClient } = require('mongodb');

const router = express.Router();
const uri = process.env.API_URI;

// render page
router.get('/', (req, res) => {
  res.render('readById', { title: 'Read By Id' });
});

// read from database by id
router.post('/', (req, res) => {
  // connect to db
  async function run() {
    const client = new MongoClient(uri, { useUnifiedTopology: true });
    await client.connect();
    const database = client.db('magazunCRUD');
    const collection = database.collection('tovar');

    // find and return result
    const { id } = req.body;
    const dataArray = await collection.findOne({ _id: objectId(id) });
    await client.close();
    res.render('readById', { title: 'Read By Id', someData: dataArray });
  }
  run().catch();
});

module.exports = router;
