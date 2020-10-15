const express = require('express');

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
        res.render('read', { someData: dataArray });
      },
    );
  }
  run();
});

module.exports = router;
