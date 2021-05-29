const mongoose = require('mongoose')
const { Schema } = require('mongoose');
const { usersSchema } = require('../models/usersModel')
const Users = mongoose.model('Users', usersSchema)
const uuid = require('uuid');
const { todosModel, todoSchemaToUse } = require('../models/todosModel');
const TodoValidator = require('../validators/todoValidators')


module.exports = class TodoService{

    /**create a Todo */
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
        await newTodo.save()

        await Users.findByIdAndUpdate(paramsId, { $push: {todos: newTodo, new: true}})

        return newTodo

    }

    /**gets all todos created by a specific user using its id */
    static async gellAllTodos(paramsId){

        return await Users.findById(paramsId, {'todos': 1})
    }
    

    static async getTodoById(paramsId){

        const { error, isValid } = await TodoValidator.retrieveTodoById(paramsId)

        if(!isValid) {
            return error
        }
        return Todo.findOne({uniqueId: paramsId})
    }

    /**get a user's profile by its Id */
    static async getUserProfile(paramsId){
        // const { error, isValid } = await TodoValidator.retrieveTodoById(paramsId)

        // if(!isValid) return error

        return await Users.findById(paramsId, {uniqueId: true, displayName: true, email: true, firstName: true, lastName: true, createdAt: true})
    }

    /**delete a todo 
     * @params paramsId - todo's unique
    */
    static async removeTodo(paramsId) {
        try{
                const { error, isValid } = await TodoValidator.retrieveTodoById(paramsId)

            if(!isValid) {
                    return error
            }
                return await todoSchemaToUse.findOneAndDelete({ where: {uniqueId: paramsId}})
        }
        catch(error) {
            return error
        }
    }

    static async updateTodo(description, paramsId) {

            const { error, isValid } = await TodoValidator.retrieveTodoById(paramsId)

            if(!isValid) {
                return error
            }

            return db.update({ description: description}, {where: {uniqueId: paramsId}})


    }

}