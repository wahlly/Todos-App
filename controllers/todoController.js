const TodoService = require('../services/todoService');
module.exports = class TodoController{
    /**
     * @param { userId} req 
     * @route PoST /user/create/todos/:userId
     * @returns the newly created todo
     */
    static async createTodo(req, res) {
        try{
            let newTodo = await TodoService.createTodo(req.body.description, req.params.id);

            return res.status(200).json({
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

    /**
     * 
     * @route GET /user/todos
     * @param {todos} res 
     * @returns all todos
     */
    static async getTodos(req, res) {
        try{
            let todos = await TodoService.getAllTodos(req.params.userId)

            if(!todos){
                return res.status(400).json({ err: 'bad request' })
            }
            return res.status(200).json({
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

    /**
     * 
     * @param {uniqueId} req 
     * @route GET /todos/:uniqueId
     * @returns the todo that has the given uniqueId passed as a params
     */
    static async specifyTodo(req, res) {
        try{
            let todo = await TodoService.getTodoById(req.params.uniqueId);

            if(!todo) {
                return res.status(404).json({ msg: 'request not found!' })
            }

            return res.status(200).json({
                status: 'success',
                data: todo
            });
        }
        catch(err) {
            res.status(500).json({
                status: 'Not Found',
                data: err
            });
        }

    }

    /**
     * 
     * @param {userId} req 
     * @route GET /user/profile/:id
     * @returns user's profile
     */
    static async getUser(req, res) {
        try{
            let user = await TodoService.getUserProfile(req.params.id)
            if(!user) {
                return res.status(404).json({ msg: 'user not found' })
            }

            return res.status(200).json({
                status: 'success',
                data: user
            })
        }
        catch(err) {
            res.status(500).json({
                status: 'server error',
                data: err
            })
        }
    }

    /**
     * 
     * @param {todo's id} req 
     * @route DELETE /user/todos/:id
     * @returns success message if completed || error message if not completed
     */
    static async deleteTodo(req, res){
        try{
            let todo = await TodoService.removeTodo(req.params.id)
            if(!todo) {
                return res.status(404).json({ msg: 'not found'})
            }

            return res.status(200).json({
                status: 'success',
                msg: `task with id:${req.params.id} has been deleted successfully`
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

    static async updateTodo(req, res) {
        try{
            const updatedTodo = await TodoService.editTodo(req.params.uniqueId, req.body.description)
            return res.status(200).json({
                status: 'success',
                msg: 'updated successfully',
                updatedTodo
            })
        }
        catch(err) {
            console.error(err)
            res.status(500).json({
                status: 'failed',
                msg: 'server error'
            })
        }
    }
}