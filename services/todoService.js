const uuid = require('uuid');
const Todo = require('../models/todosModel');
const TodoValidator = require('../validators/todoValidators')


module.exports = class TodoService{

    static async createTodo(description) {

        const { error, isValid } = await TodoValidator.todoCreation(description)

        if(!isValid) {
            return error
        }

        let newTodo = new Todo({
            "uniqueId" : uuid.v4(),
            "description": description,
            "isCompleted": false
        })

         return newTodo.save();
    }

    static async gellAllTodos(){

        let result = Todo.find({}).sort({description: 1})
        return result
    }
    

    static async getTodoById(paramsId){

        const { error, isValid } = await TodoValidator.retrieveTodoById(paramsId)

        if(!isValid) {
            return error
        }
        return Todo.findById(paramsId)
    }

    static async removeTodo(paramsId) {

        const { error, isValid } = await TodoValidator.retrieveTodoById(paramsId)

        if(!isValid) {
            return error
        }
        return Todo.findOneAndDelete({paramsId})

    }

    static async updateTodo(description, paramsId) {

        const { error, isValid } = await TodoValidator.retrieveTodoById(paramsId)

        if(!isValid) {
            return error
        }

        return db.update({ description: description}, {where: {uniqueId: paramsId}})

    }

}