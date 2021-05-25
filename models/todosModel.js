const Mongoose = require('mongoose');

const todoSchema = new Mongoose.Schema({
    uniqueId: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    isCompleted: {
        type: Boolean,
        default: false
    }
},
{
    timestamps: true
});

module.exports = Mongoose.model('Todo', todoSchema);