const { usersSchema } = require('../models/usersModel')
const mongoose = require('mongoose')
const Users = mongoose.model('Users', usersSchema)
const bcrypt = require('bcrypt')
let password = 'wale369852'


module.exports = class SeedAdmin{

    static async adminAuth() {
        try{
            //check if there is admin account
            const isAdmin = await Users.findOne({ role: 'Admin' })
            if(isAdmin) {
                return 'Admin account already exists'
            }

            const user = Users.create({
                firstName: 'olawale',
                lastName: 'abdulwahab',
                displayName: 'wahlly',
                email: 'olaifaolawaleh@gmail.com',
                hashPassword: 'wale369852',
                role: 'Admin'
            })

           
            user.hashPassword = bcrypt.hash(password, 10)

            return await user.save()

        }
        catch(err) {
            console.error(err)
        }
    }

    static checkIfAdmin(req, res, next) {
        if(req.user.role !== 'Admin') {
            return res.status(401).json({ msg: 'you are not authorised to access this route!' })
        }
        return next()
    }
}