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

    /** 
     * @desc gets all todos
     * */
    static async getAllTodos(userId){
        try{
            // return await Users.findById(paramsId, {'todos': 1})
        
            return await todosModel.find({ userId: userId })
            // .populate('user')
            // .lean()
        }
        catch(err) {
            console.error(err)
        }
    }

    /**
     * 
     * @param {todos uniqueId} paramsId 
     * @returns todo that has the given uniqueId
     */
    static async getTodoById(paramsId){
        const { error, isValid } = await TodoValidator.retrieveTodoById(paramsId)
        if(!isValid) {
            return error
        }
        try{
            return todosModel.findOne({uniqueId: paramsId})
        }
        catch(err) {
            console.error(err)
        }
    }

    /**
     * 
     * @desc return's a user profile using the user's userId
     * 
     */
    static async getUserProfile(paramsId){
        const { error, isValid } = await TodoValidator.retrieveTodoById(paramsId)
        if(!isValid) return error

        return await Users.findById(paramsId, {uniqueId: true, displayName: true, email: true, firstName: true, lastName: true, createdAt: true})
    }

    /**
     * @desc deletes a todo
    */
    static async removeTodo(paramsId) {
        try{     
            return await todosModel.findByIdAndDelete(paramsId)
        }
        catch(error) {
            return error
        }
    }

    /**
     * 
     * @param {uniqueId} paramsId 
     * @param {todo's description} description 
     * @desc updates a todo
     */
    static async editTodo(paramsId, description) {
            const { error, isValid } = await TodoValidator.retrieveTodoById(paramsId)
            if(!isValid) {
                return error
            }
            return await todosModel.findOneAndUpdate({ uniqueId: paramsId }, { description: description}, {
                new: true,
                runValidators: true
             })
    }
}