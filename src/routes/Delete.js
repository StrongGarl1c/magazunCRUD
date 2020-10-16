const express = require('express');
const objectId = require('mongodb').ObjectId;
require('dotenv').config({ path: './config/.env' });
const { MongoClient } = require('mongodb');

const router = express.Router();
const uri = process.env.API_URI;

// render page and show data from db
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
        res.render('delete', { title: 'Delete by id', someData: dataArray });
      },
    );
  }
  run();
});

// delete from database
router.post('/', (req, res) => {
  // connect to db
  async function run() {
    const client = new MongoClient(uri, { useUnifiedTopology: true });
    await client.connect();
    const database = client.db('magazunCRUD');
    const collection = database.collection('tovar');

    // delete operation
    const { id } = req.body;
    await collection.findOneAndDelete({ _id: objectId(id) });
    await client.close();
    res.redirect('/delete');
  }
  run().catch();
});

module.exports = router;
