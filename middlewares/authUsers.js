const authPage = (permissions) => {
    return (req, res, next) => {
        const userRole = req.body.role
        if(permissions.includes(userRole)) {
            next()
        } else {
            return res.status(401).json('you are not authorised to view the requested page!')
        }
    }
}

const authTodos = () => {
    
}


module.exports = { authPage, authCourse }