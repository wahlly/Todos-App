const mongoose = require('mongoose')
const { Schema } = require('mongoose');
const { usersSchema } = require('../models/usersModel')
const Users = mongoose.model('Users', usersSchema)
const uuid = require('uuid');
const { todosModel } = require('../models/todosModel');
const TodoValidator = require('../validators/todoValidators')


module.exports = class TodoService{

    static async createTodo(description, paramsId) {

        const { error, isValid } = await TodoValidator.todoCreation(description)

        if(!isValid) {
            return error
        }

        let newTodo = await new todosModel({
            "uniqueId" : uuid.v4(),
            "userId": paramsId,
            "description": description,
            "isCompleted": false
        })
        console.log(newTodo)

        let updatedUser = await Users.findByIdAndUpdate(paramsId, { $push: {todos: newTodo, new: true}})
        return updatedUser

        //get user
        // let user = await Users.findById(paramsId)
        // //assign user as author of todo
        // user = user.todos
        // console.log(user)
        // //save the todos
        // await newTodo.save()
        // console.log(newTodo)
        // //add todo to the user's array of todos
        // let result = user.todos.push(newTodo)
        // console.log(result)

        // const userById = await Users.findById(paramsId)
        // userById.todos.push(newTodo)
        
        //  return userById.save()
    }

    /**gets all todos created by a specific user using its id */
    static async gellAllTodos(paramsId){

        // let result = Todo.find({}).sort({description: 1})
        // return result
        return await Users.findById(paramsId, {'todos': 1})
    }
    

    static async getTodoById(paramsId){

        const { error, isValid } = await TodoValidator.retrieveTodoById(paramsId)

        if(!isValid) {
            return error
        }
        return Todo.findOne({uniqueId: paramsId})
    }

    static async removeTodo(paramsId) {

            const { error, isValid } = await TodoValidator.retrieveTodoById(paramsId)

        if(!isValid) {
                return error
        }
            return Todo.findOneAndDelete({uniqueId: paramsId})
        
    }

    static async updateTodo(description, paramsId) {

            const { error, isValid } = await TodoValidator.retrieveTodoById(paramsId)

            if(!isValid) {
                return error
            }

            return db.update({ description: description}, {where: {uniqueId: paramsId}})


    }

}