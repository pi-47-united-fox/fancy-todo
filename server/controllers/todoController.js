const { Todo } = require('../models')

class TodoController {
    static getAllTodo(req,res){
        Todo.findAll()
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            res.status(500).json(err)
        })
    }
    static getTodoByPk(req,res){
        Todo.findByPk(+req.params.id)
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            res.status(404).json(err)
        })
    }
    static createTodo(req,res){
        Todo.create({
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            due_date: req.body.due_date
        })
        .then(data => {
            res.status(201).json(data)
        })
        .catch(err => {
            res.status(400).json(err)
        })
    }
    static putTodo(req,res){
        const putTodo = {
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            due_date: req.body.due_date
        }
        Todo.update(putTodo, {
            where: {
                id: +req.params.id
            }
        })
        .then(data => {
            res.status(200).json({message: 'todo success to update'})
        })
        .catch(err => {
            res.status(500).json(err)
        })
    }
    static patchTodo(req,res){
        const patchTodo = {
            status: req.body.status,
        }
        Todo.update(patchTodo, {
            where: {
                id: +req.params.id
            }
        })
        .then(data => {
            res.status(200).json({message: 'todo status success to update'})
        })
        .catch(err => {
            res.status(500).json(err)
        })
    }
    static deleteTodo(req,res){
        Todo.destroy({
            where: {
                id: req.params.id
            }
        })
        .then(data => {
            if(data === 1){
                res.status(200).json({message: 'todo success to delete'})
            } else {
                res.status(404).json({message: 'Invalid todo'})
            }
        })
        .catch(err => {
            res.status(500).json(err)
        })
    }
}

module.exports = TodoController