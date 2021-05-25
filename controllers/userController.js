const { userRegistration, credentialsValidation } = require('../services/userService')
const jwt = require('jsonwebtoken')

module.exports = class userController{

    static async registerUser(req, res) {
        try {
            let userProfile = req.body
            let newUser = await userRegistration(userProfile)
            newUser.hashPassword = undefined

            res.status(200).json({
                status: 'success',
                data: newUser
            })
        }
        catch (error) {
           res.status(500).json({
               status: 'failed',
               data: error
           })
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

            return res.status(200).json({
                status: 'success',
                token: jwt.sign({
                    displayName: user.displayName,
                    email: user.email,
                    _id: user.id
                }, 'RESTFULAPIs')
            })
        }
        catch(err) {
            res.status(500).json({
                status: 'failed',
                err
            })
        }
    }

}