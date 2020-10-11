const express = require("express");
const { response } = require("express");
const app = express();
const port = process.env.PORT || 5000;
const databaseCRUD = require("../db/databaseCRUD.js");
const router = express.Router();

// rout paths
const read = require("../routes/read")
const _delete = require("../routes/_delete")
const create = require("../routes/create")
const update = require("../routes/update")

app.listen(port, () => console.log(`server is running on port ${port}`));
app.use(express.static("../public"));
app.use(express.json());

// routes
app.use("/", router);
app.use("/read", read);
app.use("/create", create);
app.use("/delete", _delete);
app.use("/update", update);

// connect to db
databaseCRUD.run().catch((err) => {
    console.error(err);
});