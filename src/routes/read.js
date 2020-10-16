const express = require('express');
require('dotenv').config({ path: './config/.env' });
const { MongoClient } = require('mongodb');

const router = express.Router();
const uri = process.env.API_URI;

// read from database
router.get('/', (req, res) => {
  // connect to db
  async function run() {
    const client = new MongoClient(uri, { useUnifiedTopology: true });
    await client.connect();
    const database = client.db('magazunCRUD');
    const collection = database.collection('tovar');

    // find and extract data from db
    const dataArray = [];
    const cursor = collection.find({}).sort({ _id: -1 });
    cursor.forEach(
      (element) => {
        dataArray.push(element);
      },
      () => {
        client.close();
        res.render('read', { title: 'Read', someData: dataArray });
      },
    );
  }
  run();
});

module.exports = router;
