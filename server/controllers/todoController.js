const { Todo } = require('../models')

class TodoController {
    static createTodo(req, res, next) {
        const newTodo = {
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            due_date: req.body.due_date,
            UserId: req.userData.id
        }
        Todo.create(newTodo)
            .then(todo => {
                return res.status(201).json(todo)
            })
            .catch(err => {
                return next(err)
            })
    }

    static readTodo(req, res, next) {
        Todo.findAll()
            .then(result => {
                return res.status(200).json(result)
            })
            .catch(err => {
                return next(err)
            })
    }

    static findTodo(req, res, next) {
        Todo.findOne({
                where: {
                    id: +req.params.id
                }
            })
            .then(result => {
                return res.status(200).json(result)
            })
            .catch(err => {
                return next(err)
            })
    }

    static updateTodo(req, res, next) {
        const updateTodo = {
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            due_date: req.body.due_date,
            UserId: req.userData.id
        }
        Todo.update(updateTodo, {
                where: {
                    id: +req.params.id
                }
            })
            .then(result => {
                res.status(200).json(updateTodo)
            })
            .catch(err => {
                return next(err)
            })
    }

    static updateAttTodo(req, res, next) {
        const updateTodo = {
            status: req.body.status,
            UserId: req.userData.id
        }
        Todo.update(updateTodo, {
                where: {
                    id: +req.params.id
                }
            })
            .then(result => {
                res.status(200).json(updateTodo)
            })
            .catch(err => {
                return next(err)
            })
    }

    static deleteTodo(req, res, next) {
        Todo.destroy({
                where: {
                    id: +req.params.id
                }
            })
            .then(result => {
                res.status(200).json({ message: 'todo success to delete' })
            })
            .catch(err => {
                return next(err)
            })
    }
}

module.exports = TodoController