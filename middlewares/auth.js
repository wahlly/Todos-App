

module.exports = class Authentication{
    static requireLogin(req, res, next) {
        if(req.user){
            next()

        } else{
            return res.status(401).json({
                status: 'failed',
                msg: 'Unauthorized User!'
            })
        }
    }
}