

module.exports = class Authentication{
    static requireLogin(req, res, next) {
        if(req.session.userId){
            next()
        }
        else{
            res.redirect('/todos/login/')
            // return res.status(401).json({
            //     status: 'failed',
            //     msg: 'Unauthorized User!'
            // })
        }
    }
}