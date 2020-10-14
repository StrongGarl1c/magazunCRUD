const express = require('express');

const router = express.Router();
require('dotenv').config();
const { MongoClient } = require('mongodb');
// eslint-disable-next-line no-undef
const uri = process.env.API_URI;
const client = new MongoClient(uri, { useUnifiedTopology: true });

// read from database
router.get('/', (req, res) => {
  // connect to db
  async function run() {
    await client.connect();
    const database = client.db('magazunCRUD');
    const collection = database.collection('tovar');

    const dataArray = [];
    const cursor = collection.find({});
    cursor.forEach(
      (element) => {
        dataArray.push(element);
      },
      () => {
        res.json(dataArray);
        client.close();
      },
    );
  }
  run();
});

module.exports = router;
