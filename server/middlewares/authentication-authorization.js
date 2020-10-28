const {User,Todo} = require('../models/index.js')
const {verifyToken} = require('../helpers/jwt.js')

const authentication = (req, res, next) => {
    const decoded = verifyToken(req.headers.access_token)
    User.findOne({where:{email: decoded}})
    .then(data => {
        if(!data) {
            res.status(404).json({message : 'User Not found'})
        } else {
            req.userData = data
            next()
        }
    }) 
    .catch(err=> {
         res.status(500).json({message : err.message})
    }) 
}

const authorization = (req, res, next) => {
    const id = req.params.id
    console.log(req.params.id)
    const userData = req.userData.id
    Todo.findByPk(id)
    .then(data => {
        if(!data) {
            res.status(404).json({message : 'Data Todo Not Found'})
        } else if(userData !== data.UserId) {
            res.status(403).json({message : `You don't have access`})
        } else {
            next()
        }
    })
    .catch(err => {
        res.status(500).json({message : err.message})
    })
}
module.exports = {
    authentication,
    authorization
}