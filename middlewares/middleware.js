const express = require('express')
const rateLimit = require('express-rate-limit')
const path = require('path');

module.exports = (app) => {

    // app.use(rateLimit({
    //     windowMs: 1 * 60 * 1000,
    //     max: 50,
    //     message: 'oops!, kindly try again later'
        
    // }))

    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));

    app.set('view engine', 'ejs');
    app.set('views', path.join(__dirname, '../views'));
}