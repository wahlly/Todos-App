const TodoService = require('../services/todoService');

module.exports = class TodoController{
    static async createTodo(req, res) {
        try{
            let desc = req.body.description
            let description = desc.toLowerCase()
            let newTodo = await TodoService.createTodo(description);

            res.status(200).json({
                status: 'success',
                data: newTodo
            })
        }
        catch(err){
            res.status(500).json({
                status: 'failed',
                data: err
            })
        }

    }

    static async getTodos(req, res) {
        try{
            let todos = await TodoService.gellAllTodos()
            res.status(200).json({
                status: 'success',
                data: todos
            })
        }
        catch(err){
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

    static async deleteTodo(req, res){
        try{
            let todo = await TodoService.removeTodo(req.params.uniqueId)

            res.status(200).json({
                status: 'success',
                msg: `task with id:${req.params.uniqueId} has been deleted successfully`,
                data: todo
            })
        }
        catch(err) {
            res.status(500).json({
                status: 'success',
                msg: 'error occured while performing the specified operation',
                data: err
            })
        }

    }

}