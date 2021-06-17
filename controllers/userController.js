const { userRegistration, credentialsValidation } = require('../services/userService')
const jwt = require('jsonwebtoken')

module.exports = class userController{

    static async registerUser(req, res) {
        try {
            let userProfile = req.body
            let newUser = await userRegistration(userProfile)
            newUser.hashPassword = undefined
            return res.redirect('/todos/login')
            // res.status(200).json({
            //     status: 'success',
            //     data: newUser
            // })
        }
        catch (error) {
            // console.log(error)
            if(error) {
                res.render('error')
            }
        //    res.status(500).json({
        //        status: 'failed',
        //        data: error
        //    })
        }
    }

    static async checkUsersLogin(req, res) {
        try{
            let usersMail = req.body.email
            let user = await credentialsValidation(usersMail)

            if(!user) {
                return res.status(401).json({
                    status: 'failed',
                    msg: 'Authentication failed, User not found!'
                })
            }
            if(!user.comparePassword(req.body.password, user.hashPassword)){
                return res.status(401).json({
                    status: 'failed',
                    msg: 'oops! Wrong password. try again'
                })
            }
            req.session.isLoggedIn = true
            req.session.displayName = user.displayName
            req.session.userId = user._id
            return res.redirect('/todos')
        }
        catch(err) {
            res.render('error')
            console.log(err)
            // res.status(500).json({
            //     status: 'failed',
            //     err
            // })
        }
    }

    static async logout(req, res) {
        req.session.isLoggedIn = false
        req.session = null
        req.session.cookie.maxAge = new Date().getTime();
        // req.session.destroy()
        console.log(req.session)
        res.redirect('/todos/login')
    }

}