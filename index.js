const express = require('express');
const app = express();
const route = require('./routes/index')
require('dotenv').config()
const port = process.env.PORT || 8000;
const bodyParser = require('./middlewares/middleware.js')
const connectDB = require('./models/configdb')
const { adminAuth } = require('./middlewares/authSeeders')

connectDB();

bodyParser(app);
route(app);


// console.log(func())
console.log(adminAuth())
app.listen(port, () => {
    console.log(`server is listening on ${port}`)
});