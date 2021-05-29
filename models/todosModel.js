const Mongoose = require('mongoose');

const todoSchema = new Mongoose.Schema({
    uniqueId: {
        type: String,
        require: true
    },
    userId: {
        type: Mongoose.Schema.Types.ObjectId,
        ref: 'Users'
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

let todosModel = Mongoose.model('Todo', todoSchema)
let todoSchemaToUse = todoSchema
module.exports = { todosModel, todoSchemaToUse }

// module.exports = Mongoose.model('Todo', todoSchema);