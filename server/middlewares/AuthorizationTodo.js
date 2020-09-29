const { Todo } = require('../models')

module.exports = (req, res, next) => {
    const { id }   = req.params
    const userDataId = req.userData.id
    Todo.findByPk(id)
        .then((result) => {
            if (!result) {
                res.status(404).json({
                    message : 'Data Todo Not Found'
                })
            } else if (userDataId !== result.UserId) {
                res.status(403).json({
                    message : 'You dont have access'
                })
            } else {
                next()
            }
        }).catch((err) => {
            return res.status(500).json({message : err.message})
        })
}