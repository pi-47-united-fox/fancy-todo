'use strict'
const {Todo} = require('../models/index.js') 

class TodoController {
    static createTodo (req, res) {
        const newTodo = {
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            due_date: req.body.due_date
        }
        Todo.create(newTodo)
        .then(result=> {
            res.status(201).json(result)
        })
        .catch(err=> {
            res.status(500).json(err)
        })
    }
    static findAllTodo (req, res) {
        Todo.findAll()
        .then(result=> {
                res.status(200).json(result)
        })
        .catch(err=> {
            res.status(500).json(err)
        })
    }
    static findByIdTodo(req, res) {
        let findId = Number(req.params.id)
        Todo.findOne(findId)
        .then(result=> {
             res.status(200).json(result)
        })
        .catch(err=> {
            res.status(500).json(err)
        })
        
    }
    static updateTodo (req, res) {
        const updateTodo = {
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            due_date: req.body.due_date
        }
        Todo.update(updateTodo)
        .then(result=> {
            res.status(200).json(result)
        })
        .catch(err=> {
            res.status(500).json(err)
        })
    }
    static updateStatusTodo (req, res) {
        Todo.update({
            status: req.body.status,
        },{
            where: {
                id: targetId
            }
        })     
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            res.status(500).json(err)
        })
    }
    static deleteTodo (req,res) {
        Todo.destroy({
            where: {
            id: Number(req.params.id)
        }
    })
        .then(result=> {
            console.log(result)
            res.status(200).json(result)
        })
        .catch(result=> {
            res.status(500).json(error)
        })
    }
}

module.exports = TodoController