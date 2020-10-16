const express = require('express');
const exphbs = require('express-handlebars');

const app = express();
const port = process.env.PORT || 5000;

// rout paths
const routes = require('../routes/index');
const read = require('../routes/read');
const Delete = require('../routes/Delete');
const create = require('../routes/create');
const update = require('../routes/update');
const readById = require('../routes/readById');

// express
app.listen(port);
app.use(express.static('../public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

// routes
app.use('/', routes);
app.use('/read', read);
app.use('/create', create);
app.use('/delete', Delete);
app.use('/update', update);
app.use('/readById', readById);
