const uuid = require('uuid');
// const Todo = require('../models/mongoose/todosModel');
const db = require('../models/sequelize/index')
const TodoValidator = require('../validators/todoValidators')


module.exports = class TodoService{

    static async createTodo(description) {

        const { error, isValid } = await TodoValidator.todoCreation(description)

        if(!isValid) {
            return error
        }
        // let newTodo = new Todo({
        //     "uniqueId" : uuid.v4(),
        //     "description": description,
        //     "isCompleted": false
        // })

        //  return newTodo.save();

        return db.create({
            "uniqueId" : uuid.v4(),
            "description": description,
            "isCompleted": false
        })
    }

    static async gellAllTodos(){

        // let result = Todo.find({}).sort({description: 1})
        // return result

        let result = db.findAll()
        return result
    }
    

    static async getTodoById(paramsId){

        const { error, isValid } = await TodoValidator.retrieveTodoById(paramsId)

        if(!isValid) {
            return error
        }
        // return Todo.findById(paramsId)

        return db.findOne({ where: {uniqueId: paramsId} })

    }

    static async removeTodo(paramsId) {

        const { error, isValid } = await TodoValidator.retrieveTodoById(paramsId)

        if(!isValid) {
            return error
        }
        // return Todo.findOneAndDelete({paramsId})

        return db.destroy({ where: {uniqueId: paramsId} })

    }

    static async updateTodo(description, paramsId) {

        const { error, isValid } = await TodoValidator.retrieveTodoById(paramsId)

        if(!isValid) {
            return error
        }

        return db.update({ description: description}, {where: {uniqueId: paramsId}})

    }

}