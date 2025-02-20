const path = require('path');
const express = require('express');
const morgan = require('morgan');
const handlebars = require('express-handlebars');
const exp = require('constants');
const app = express();
const port = 3000;

const route = require('./routes');
const db = require('./config/db');

// Connect to db
db.connect();

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({ extended: true }));
app.use(express.json()); //XMLHttpRequest, fetch, axios

// HTTP logger
app.use(morgan('combined'));

// Template engine
app.engine(
    'hbs',
    handlebars.engine({
        extname: '.hbs',
        // helpers: {
        //     sum: (a, b) => a + b,
        // },
    }),
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));

// Home, search, contact

// Routes init
route(app);

// 127.0.0.1 - localhost

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
