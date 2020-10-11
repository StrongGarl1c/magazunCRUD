require("dotenv").config();
const { MongoClient } = require("mongodb");
const uri = process.env.API_URI;
const client = new MongoClient(uri, { useUnifiedTopology: true });

//connect to db
async function run() {
    await client.connect();
    console.log("conected to database");
    const database = client.db("magazunCRUD");
    const collection = database.collection("tovar");
};

module.exports.run = run;