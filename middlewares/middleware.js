const express = require('express')
const rateLimit = require('express-rate-limit')
const path = require('path');
const jwt = require('jsonwebtoken')

module.exports = (app) => {

    // app.use(rateLimit({
    //     windowMs: 1 * 60 * 1000,
    //     max: 50,
    //     message: 'oops!, kindly try again later'
        
    // }))

    //JWT setup
    // app.use((req, res, next) => {
    //     if(req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] == 'JWT') {
    //         jwt.verify(req.headers.authorization.split(' ')[1], 'RESTFULAPIs', (err, decodedToken) => {
    //             if(err) req.user = undefined
    //             req.user = decodedToken
    //             next()
    //         })
    //     } else{
    //         req.user = undefined
    //         next()
    //     }
    // })

    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));

    app.set('view engine', 'ejs');
    app.set('views', path.join(__dirname, '../views'));
}