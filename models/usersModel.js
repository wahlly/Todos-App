const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { todoSchemaToUse} = require('../models/todosModel');

exports.usersSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
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
    },
    role: {
        type: String,
        enum: ['Admin', 'regular'],
        default: 'regular'
    },
    todos: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: todoSchemaToUse
    }]
},
{
    timestamps: true
})

exports.usersSchema.methods.comparePassword = (password, hashPassword) => {
    return bcrypt.compareSync(password, hashPassword)
}