'use strict'
const {Todo} = require('../models/index.js') 

class TodoController {
    static createTodo (req, res) {
        const newTodo = {
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            due_date: req.body.due_date,
            UserId: req.userData.id
        }
        console.log(newTodo)
        Todo.create(newTodo)
        .then(result=> {
            res.status(201).json(result)
        })
        .catch(err=> {
            res.status(500).json(err)
        })
    }
    static findAllTodo (req, res) {
        Todo.findAll({
            where: {UserId: req.userData.id
            }
        })
        .then(result=> {
            result.sort((a,b)=> {
                return a.id-b.id
            })
            res.status(201).json(result)
        })
        .catch(err=> {
            res.status(500).json(err)
        })
    }
    static findByIdTodo(req, res) {
        let findId =  req.params.id
        Todo.findByPk(findId)
        .then(result=> {
             res.status(200).json(result)
        })
        .catch(err=> {
            res.status(500).json(err)
        })
    }
    static updateTodo (req, res) {
        let idTodo = req.params.id
        const updateTodo = {
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            due_date: req.body.due_date
        }
        Todo.update(updateTodo,{
             where: {
            id: idTodo,
        },
        returning: true
    })
        .then(result=> {
            res.status(200).json(result[1][0])
        })
        .catch(err=> {
            res.status(500).json(err)
        })
    }
    static updateStatusTodo (req, res) {
        let inputBody = {
            status: true
        }
        Todo.update(inputBody,
            {
                where:{
                    id: +req.params.id
                },
                returning: true
            })
            .then(result=> {
                let obj= {
                    status: result[1][0].status
                }
                res.status(200).json(obj)
            })
            .catch(err=> {
                res.status(400).json(err.errors);
            })
        }

    static deleteTodo (req,res) {
        Todo.destroy({
            where: {
            id: Number(req.params.id)
        }
    })
        .then(result=> {
            if (result === 1) {
                let msg = {
                    message: 'todo success to delete'
                }
                res.status(200).json(msg)
            }
        })
        .catch(result=> {
            res.status(500).json(error)
        })
    }
}

module.exports = TodoController