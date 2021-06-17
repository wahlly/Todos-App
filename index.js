const express = require('express');
const app = express();
const route = require('./routes/index')
require('dotenv').config()
const port = process.env.PORT || 8000;
const bodyParser = require('./middlewares/middleware.js')
const connectDB = require('./models/configdb')
const { adminAuth } = require('./middlewares/authSeeders')
const session = require('express-session');
const MongoStore = require('connect-mongo')

connectDB();

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URI, collectionName: 'sessions'}),
    cookie: {  maxAge: 3600000 }
  }))

bodyParser(app);
route(app);

console.log(adminAuth())
app.listen(port, () => {
    console.log(`server is listening on ${port}`)
});