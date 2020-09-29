const { Todo } = require('../models')

class TodoController {
    static getAllTodo(req,res,next){
        Todo.findAll()
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            next(err)
        })
    }
    static getTodoByPk(req,res,next){
        Todo.findByPk(+req.params.id)
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            next(err)
        })
    }
    static createTodo(req,res,next){
        // console.log('halo')
        Todo.create({
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            due_date: req.body.due_date,
            UserId: req.userData.id
        })
        .then(data => {
            res.status(201).json(data)
        })
        .catch(err => {
            next(err)
        })
    }
    static putTodo(req,res,next){
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
            next(err)
        })
    }
    static patchTodo(req,res,next){
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
            next(err)
        })
    }
    static deleteTodo(req,res,next){
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
            next(err)
        })
    }
    
}

module.exports = TodoController