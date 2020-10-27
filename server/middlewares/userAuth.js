const { verifyToken } = require('../helpers/jwt.js')
const { User, Todo } = require('../models/index.js')

// middleware for user authentication
const authentication = (req, res, next) => {
    const { access_token } = req.headers
    // console.log(req.headers)
    if(access_token){
        let decode = verifyToken(access_token)
        req.userData = decode
        User.findByPk(req.userData.id)
            .then(result => {
                if(!result){
                    // res.status(404).json({message: "User not found."})
                    next({name:'Not Found', message: "User not found."})
                }
                next()
            })
            .catch(err => {
                // res.status(500).json({message: err.message})
                next(err)
            })
    }
    else{
        // res.status(401).json({message: "Invalid access!"})
        next({name: 'Unauthorized', message: "Invalid access!"})
    }
}

// middleware for user authorization
const authorization = (req, res, next) => {
    let todoId = +req.params.id
    const userData = req.userData

    Todo.findByPk(todoId)
        .then(result => {
            if(!result){
                // res.status(404).json({
                //     message: "Todo's data not found!"
                // })
                next({name:'Not Found', message:"Todo's data not found!"})
            }
            else if(userData.id !== result.UserId){
                // res.status(403).json({
                //     message: "You do not have access!"
                // })
                next({name:'Forbidden'})
            }
            else{
                next()
            }
        })
        .catch(err => {
            // res.status(500).json({
            //     message: err.message
            // })
            next(err)
        })
}

module.exports = {
    authentication,
    authorization
}