const TodoService = require('../services/todoService');
const mongoose = require('mongoose')
const todoId = mongoose.Types.ObjectId

module.exports = class TodoController{
    
    static async createTodo(req, res) {
        try{
            let newTodo = await TodoService.createTodo(req.body.description, req.params.id);

            res.status(200).json({
                status: 'success',
                data: newTodo
            })
        }
        catch(err) {
            console.log(err)
            res.status(500).json({
                status: 'failed',
                data: 'err'
            })
        }

    }

    static async getTodos(req, res) {
        try{
            req.params.id = todoId(req.params.id)
            let todos = await TodoService.gellAllTodos(req.params.id)

            if(!todos){
                return res.status(400).json({ err: 'bad request' })
            }
            res.status(200).json({
                status: 'success',
                data: todos
            })
        }
        catch(err) {
            console.error(err)
            res.status(500).json({
                status: 'failed',
                data: err
            })
        }

    }

    static async specifyTodo(req, res) {
        try{
            let todo = await TodoService.getTodoById(req.params.uniqueId);

            res.status(200).json({
                status: 'success',
                data: todo
            });
        }
        catch(err) {
            res.status(404).json({
                status: 'Not Found',
                data: err
            });
        }

    }

    /**return a single user profile */
    static async getUser(req, res) {
        try{
            let user = await TodoService.getUserProfile(req.params.id)

            res.status(200).json({
                status: 'success',
                data: user
            })
        }
        catch(err) {
            res.status(500).json({
                status: 'user not found',
                data: err
            })
        }
    }

    /**delete a todo */
    static async deleteTodo(req, res){
        try{
             await TodoService.removeTodo(req.params.uniqueId)

            res.status(200).json({
                status: 'success',
                msg: `task with id:${req.params.uniqueId} has been deleted successfully`
            })
        }
        catch(err) {
            res.status(500).json({
                status: 'failed',
                msg: 'error occured while performing the specified operation',
                data: err
            })
        }

    }

}