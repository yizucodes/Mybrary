if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');

const indexRouter = require('./routes/index');

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

// Hook up express layouts
app.set('layout', 'layouts/layout');
app.use(expressLayouts);
app.use(express.static('public'));

//Setup DB
const mongoose = require('mongoose');
// Setup connection with DB, useNewUrlParser to setup access MongoDB with latest version of mongoose
mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to Mongoose'));

app.use('/', indexRouter);

app.listen(process.env.PORT || 3000);
