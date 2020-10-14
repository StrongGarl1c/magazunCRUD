const express = require('express');
// eslint-disable-next-line no-unused-vars
const { response } = require('express');

const app = express();
// eslint-disable-next-line no-undef
const port = process.env.PORT || 5000;
const exphbs = require('express-handlebars');

// rout paths
const routes = require('../routes/index');
const read = require('../routes/read');
const Delete = require('../routes/Delete');
const create = require('../routes/create');
const update = require('../routes/update');
const test = require('../routes/test');

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
app.use('/test', test);
