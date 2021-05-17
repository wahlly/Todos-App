const uuid = require('uuid');
// const { db } = require('../models/mongoose/todosModel');
// const Todo = require('../models/mongoose/todosModel');
const db = require('../models/sequelize/index')


module.exports = class TodoService{
    static async createTodo(description) {

        // let newTodo = new Todo({
        //     "uniqueId" : uuid.v4(),
        //     "description": description,
        //     "isCompleted": false
        // })

        // return newTodo.save();

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
        // return Todo.findById(paramsId)

        return db.findOne({ where: {uniqueId: paramsId} })

    }

    static async removeTodo(paramsId) {
        // return Todo.findOneAndDelete({paramsId})

        return db.destroy({ where: {uniqueId: paramsId} })

    }

    static async updateTodo(description, paramsId) {
        return db.update({ description: description}, {where: {uniqueId: paramsId}})

    }

}