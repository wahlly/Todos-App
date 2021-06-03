

module.exports = class Authentication{
    static requireLogin(req, res, next) {
        if(req.user){
            res.redirect('/dashboard')
            next()

        } else{
            return res.status(401).json({
                status: 'failed',
                msg: 'Unauthorized User!'
            })
        }
    }
}