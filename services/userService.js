const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const { usersSchema } = require('../models/usersModel')
const Users = mongoose.model('Users', usersSchema)

module.exports = class userService{
    static async userRegistration(userProfile) {
        try {
            const newUser = new Users(userProfile)
            newUser.hashPassword = bcrypt.hashSync(userProfile.password, 10)
            return newUser.save()
        }
        catch (err) {
            console.error(err)
        }
    }

    static async credentialsValidation(usersMail) {
        try{
            return Users.findOne({email: usersMail})
        }
        catch(err){
            console.error(err)
        }
    }
}