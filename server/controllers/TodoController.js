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
                next(err)
            })
    }

    static getTodoByIdC (req, res, next) {
        Todo.findByPk(req.params.id)
            .then((result) => {
                if (!result) {
                    next({name: 'not found'})
                } else {
                    return res.status(200).json(result)
                }
            }).catch((err) => {
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
                next({name: 'not found'})
            }
        }).catch((err) => {
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
                next({name: 'not found'})
            }
        }).catch((err) => {
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
                return next({name: 'not found'})
            }
        }).catch((err) => {
            return next(err)
        })
    }
}

module.exports = TodoController