const express = require('express');
const objectId = require('mongodb').ObjectId;

const router = express.Router();
require('dotenv').config();
const { MongoClient } = require('mongodb');
// eslint-disable-next-line no-undef
const uri = process.env.API_URI;

// read from database
router.get('/', (req, res) => {
  // connect to db
  async function run() {
    const client = new MongoClient(uri, { useUnifiedTopology: true });
    await client.connect();
    const database = client.db('magazunCRUD');
    const collection = database.collection('tovar');

    const dataArray = [];
    const cursor = collection.find({}).sort({ _id: -1 });
    cursor.forEach(
      (element) => {
        dataArray.push(element);
      },
      () => {
        client.close();
        res.render('delete', { someData: dataArray });
      },
    );
  }
  run();
});

// read from database
router.post('/', (req, res) => {
  // connect to db
  async function run() {
    const client = new MongoClient(uri, { useUnifiedTopology: true });
    await client.connect();
    const database = client.db('magazunCRUD');
    const collection = database.collection('tovar');

    const { id } = req.body;
    await collection.findOneAndDelete({ _id: objectId(id) });
    await client.close();
    res.redirect('/delete');
  }
  run().catch();
});

module.exports = router;
