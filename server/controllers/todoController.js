const { Todo } = require('../models/index.js')
const axios = require('axios')
const ApiController = require('./apiController.js')

class TodoController{
    static getAllTask(req, res, next){
        Todo.findAll()
            .then(result => {
                if(result){
                    res.status(200).json(result)
                }
                else{
                    next({name: 'Not Found', message: 'Data not found!'})
                }
            })
            .catch(err => {
                // res.status(400).json(err)
                // res.send(err)
                next(err)
            })

    }

    static addTask(req, res, next){
        let obj = {
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            due_date: req.body.due_date,
            UserId: req.userData.id
        }

        Todo.create(obj)
            .then(result => {
                res.status(201).json(result)
            })
            .catch(err => {
                // res.status(500).json(err)
                // res.send(err)
                console.log(err.name, "From create task todoController")
                next(err)
            })
    }

    static getTaskById(req, res, next){
        Todo.findOne({where: {id: +req.params.id}})
            .then(result => {
                if(result){
                    res.status(200).json(result)
                }
                else{
                    next({name: 'Not Found', message: 'Data not found!'})
                }
            })
            .catch(err => {
                next(err)
            })
    }

    static updateTask(req, res, next){
        let obj = {
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            due_date: req.body.due_date
        }

        Todo.update(obj, {
            where:{
                id: +req.params.id
            }
        })
            .then(result => {
                res.status(200).json(result)
            })
            .catch(err => {
                // res.status(404).json(err)
                next(err)
            })
    }

    static modifyTaskStatus(req, res, next){
        let obj = {
            status: req.body.status
        }

        Todo.update(obj, {
            where:{
                id: +req.params.id
            }
        })
            .then(result => {
                res.status(200).json(result)
            })
            .catch(err => {
                // res.status(404).json(err.message)
                next(err)
            })
    }

    static deleteTask(req, res, next){
        Todo.destroy({
            where: {
                id: +req.params.id
            }
        })
            .then(() => {
                res.status(200).json({
                    message: "A todo has been deleted successfully."
                })
            })
            .catch(err => {
                // res.status(404).json(err)
                // next({status:404, name: 'null'})
                next(err)
            })
    }
}

module.exports = TodoController