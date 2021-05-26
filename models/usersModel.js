const mongoose = require('mongoose');
const bcrypt = require('bcrypt')

exports.usersSchema = new mongoose.Schema({
    displayName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    hashPassword: {
        type: String,
        required: true
    }
},
{
    timestamps: true
})

exports.usersSchema.methods.comparePassword = (password, hashPassword) => {
    return bcrypt.compareSync(password, hashPassword)
}