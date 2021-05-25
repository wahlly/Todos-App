const express = require('express');
const app = express();
const route = require('./routes/index')
require('dotenv').config()
const port = process.env.PORT || 8000;
const bodyParser = require('./middlewares/middleware.js')
const connectDB = require('./models/configdb')

connectDB();

bodyParser(app);
route(app);

app.listen(port, () => {
    console.log(`server is listening on ${port}`)
});