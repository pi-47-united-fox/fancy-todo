const { Todo } = require('../models/index.js')
class TodoController{
    static getAllTask(req, res){
        Todo.findAll()
            .then(result => {
                res.status(200).json(result)
            })
            .catch(err => {
                res.status(400).json(err)
            })

    }

    static addTask(req, res){
        let obj = {
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            due_date: req.body.due_date
        }

        Todo.create(obj)
            .then(result => {
                res.status(201).json(result)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }

    static getTaskById(req, res){
        Todo.findByPk(req.params.id)
            .then(result => {
                res.status(200).json(result)
            })
            .catch(err => {
                res.status(404).json(err)
            })
    }

    static updateTask(req, res){
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
                res.status(404).json(err)
            })
    }

    static modifyTaskStatus(req, res){
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
                res.status(404).json(err)
            })
    }

    static deleteTask(req, res){
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
                res.status(404).json(err)
            })
    }
}

module.exports = TodoController