const path = require('path');
const express = require('express');
const morgan = require('morgan');
const handlebars = require('express-handlebars');
const exp = require('constants');
const app = express();
const port = 3000;

const moment = require('moment');
const methodOverride = require('method-override');

const route = require('./routes');
const db = require('./config/db');
const SortMiddeware = require('./app/middlewares/SortMiddeware');

// Connect to db
db.connect();

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({ extended: true }));
app.use(express.json()); //XMLHttpRequest, fetch, axios
app.use(methodOverride('_method'));
app.use(SortMiddeware); // Sorting middleware for news route

// HTTP logger
app.use(morgan('combined'));

// Template engine
app.engine(
  'hbs',
  handlebars.engine({
    extname: '.hbs',
    helpers: {
      sum: (a, b) => a + b,
      formatDate: function (date, format) {
        return moment(date).format(format);
      },
      sortable: (field, sort) => {
        const sortType = sort.column === field? sort.type : 'default';

        const icons = {
          default: 'fa-solid fa-sort',
          asc: 'fa-solid fa-arrow-up-wide-short',
          desc: 'fa-solid fa-arrow-down-short-wide',
        };
        const types = {
          default: 'asc',
          asc: 'desc',
          desc: 'asc',
        };
        const icon = icons[sortType];
        const type = types[sortType];

        return `<a href="?_sort&column=${field}&type=${type}">
                    <i class="${icon}"></i>
                </a>`;
      },
    },
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
