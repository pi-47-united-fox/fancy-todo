const { Todo } = require('../models')

class TodoController {
    static createTodo(req, res) {
        const newTodo = {
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            due_date: req.body.due_date,
            UserId: req.userData.id
        }
        Todo.create(newTodo)
            .then(todo => {
                res.status(201).json(todo)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }

    static readTodo(req, res) {
        Todo.findAll()
            .then(result => {
                res.status(200).json(result)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }

    static findTodo(req, res) {
        Todo.findOne({
                where: {
                    id: +req.params.id
                }
            })
            .then(result => {
                res.status(200).json(result)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }

    static updateTodo(req, res) {
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
                res.status(500).json(err)
            })
    }

    static updateAttTodo(req, res) {
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
                res.status(500).json(err)
            })
    }

    static deleteTodo(req, res) {
        Todo.destroy({
                where: {
                    id: +req.params.id
                }
            })
            .then(result => {
                res.status(200).json({ message: 'todo success to delete' })
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }
}

module.exports = TodoController