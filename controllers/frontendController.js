const TodoService = require('../services/todoService');

module.exports = class FrontendTodoController{
    static async createTodo(req, res) {
        try{
            let desc = req.body.description
            let description = desc.toLowerCase()
            await TodoService.createTodo(description);
            res.render('success')
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
           res.render('dashBoard', {todos})
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
            let todos = await TodoService.getTodoById(req.params.uniqueId);

            res.render('updateTodo', {todos});
            
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
            await TodoService.removeTodo(req.params.uniqueId)

            res.redirect('/todos/');
            
        }
        catch(err) {
            res.status(500).json({
                status: 'success',
                msg: 'error occured while performing the specified operation',
                data: err
            })
        }

    }

    static async editTodo(req, res) {
        try{
            let description = req.body.description
            let paramsId = req.params.uniqueId
            await TodoService.updateTodo(description, paramsId);

            res.redirect('/todos/');
        }
        catch(err) {
            console.log(err)
            res.status(500).json({
                status: 'success',
                msg: 'error occured while performing the specified operation',
                data: err
            })
        }
    }

}