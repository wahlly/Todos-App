
module.exports = class FormRendering{
    static async newTodo(req, res) {
        res.render('createTodo')

    }

    static async userLogin(req, res) {
        res.render('login')
    }

    static async registerUser(req, res) {
        res.render('register')
    }
}