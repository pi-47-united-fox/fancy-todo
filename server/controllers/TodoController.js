const { Todo } = require('../models');

class TodoController {
    static createTodoC (req, res, next) {
        Todo.create({
            title: req.body.title,
            description: req.body.description,
            status : req.body.status,
            due_date: req.body.due_date,
            UserId: req.userData.id
        }) .then((result) => {
            return res.status(201).json(result)
        }).catch((err) => {
            console.log (err)
            // console.log (new Date())
            // if (err.name == 'SequelizeValidationError') {
            //     return res.status(400).json({
            //         message: err.errors[0].message
            //     })
            // } else {
            //     return res.status(500).json({
            //         message: 'Internal Server Error'
            //     })
            // }
            next(err)
        })
    }

    static readAllTodoC (req, res, next) {
        Todo.findAll({
            where: {
                UserId: req.userData.id
            }
        }).then((result) => {
                return res.status(200).json(result)
            }).catch((err) => {
                // console.log (err)
                // return res.status(500).json({
                //     message: 'Internal Server Error'
                // })
                next(err)
            })
    }

    static getTodoByIdC (req, res, next) {
        Todo.findByPk(req.params.id)
            .then((result) => {
                if (!result) {
                    // return res.status(404).json({
                    //     message: 'Not Found'
                    // })
                    next({name: 'not found'})
                } else {
                    return res.status(200).json(result)
                }
            }).catch((err) => {
                // console.log (err)
                next(err)
            })
    }

    static replaceTodoByIdC (req, res, next) {
        Todo.update({
            title: req.body.title,
            description: req.body.description,
            status : req.body.status,
            due_date: req.body.due_date
        }, {
            where: { id: req.params.id },
            returning: true
        }).then((result) => {
            if (result && result[0] == 1) {
                return res.status(200).json(result[1][0])
            } else {
                // return res.status(404).json({
                //     message: 'Data Not Found'
                // })
                next({name: 'not found'})
            }
        }).catch((err) => {
            // console.log (err)
            // if (err.name == 'SequelizeValidationError') {
            //     return res.status(400).json({
            //         message: err.errors[0].message
            //     })
            // } else {
            //     return res.status(500).json({
            //         message: 'Internal Server Error'
            //     })
            // }
            next(err)
        })
    }

    static modifyTodoByIdC (req, res, next) {
        Todo.update({
            status : req.body.status
        }, {
            where: { id: req.params.id },
            returning : true
        }).then((result) => {
            if (result && result[0] !== 0) {
                return res.status(200).json(result[1][0])
            } else {
                // return res.status(404).json({
                //     message: 'Data Not Found'
                // })
                next({name: 'not found'})
            }
        }).catch((err) => {
            // console.log (err)
            // if (err.name == 'SequelizeValidationError') {
            //     return res.status(400).json({
            //         message: err.errors[0].message
            //     })
            // } else {
            //     return res.status(500).json({
            //         message: 'Internal Server Error'
            //     })
            // }
            next(err)
        })
    }

    static deleteTodoByIdC (req, res, next) {
        Todo.destroy({
            where: {
                id: req.params.id
            }
        }).then((result) => {
            // 1 0
            if (result == 1) {
                return res.status(200).json({
                    message: 'Todo: success deleted'
                }) 
            } else {
                // return res.status(404).json({
                //     message: 'Data Not Found'
                // })
                return next({name: 'not found'})
            }
        }).catch((err) => {
            // console.log (err)
            // return res.status(500).json({
            //     message: 'Internal Server Error'
            // })
            return next(err)
        })
    }
}

module.exports = TodoController