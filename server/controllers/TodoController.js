const { Todo } = require('../models');

class TodoController {
    static createTodoC (req, res) {
        Todo.create({
            title: req.body.title,
            description: req.body.description,
            status : req.body.status,
            due_date: req.body.due_date
        }) .then((result) => {
            return res.status(201).json(result)
        }).catch((err) => {
            console.log (err)
        })
    }

    static readAllTodoC (req, res) {
        Todo.findAll()
            .then((result) => {
                if (result) {
                    return res.status(200).json(result)
                } else {
                    return res.status(500).json({
                        message: 'Internal Server Error'
                    })
                }
            }).catch((err) => {
                console.log (err)
            })
    }

    static getTodoByIdC (req, res) {
        Todo.findByPk(req.params.id)
            .then((result) => {
                if (!result) {
                    return res.status(404).json({
                        message: 'Not Found'
                    })
                } else {
                    return res.status(200).json(result)
                }
            }).catch((err) => {
                console.log (err)
            })
    }

    static replaceTodoByIdC (req, res) {
        Todo.update({
            title: req.body.title,
            description: req.body.description,
            status : req.body.status,
            due_date: req.body.due_date
        }, {
            where: {
                id: req.params.id
            }
        }).then((result) => {
            if (result[0] == 0) {
                return res.status(404).json({
                    message: 'Data Not Found'
                })
            } else {
                return res.status(200).json(result)
            }
        }).catch((err) => {
            console.log (err)
        })
    }

    static modifyTodoByIdC (req, res) {
        Todo.update({
            status : req.body.status
        }, {
            where: {
                id: req.params.id
            }
        }).then((result) => {
            if (result == 1) {
                return res.status(200).json(result)
            } else {
                return res.status(500).json({
                    message: 'Data Not Found'
                })
            }
        }).catch((err) => {
            console.log (err)
        })
    }

    static deleteTodoByIdC (req, res) {
        Todo.destroy({
            where: {
                id: req.params.id
            }
        }).then((result) => {
            // 1 0
            if (result == 1) {
                return res.status(200).json({
                    message: 'Todo success to delete'
                }) 
            } else {
                return res.status(404).json({
                    message: 'Data Not Found'
                })
            }
        }).catch((err) => {
            console.log (err)
        })
    }
}

module.exports = TodoController