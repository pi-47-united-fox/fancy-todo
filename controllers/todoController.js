const { Todo } = require("../models/index")

class todoController {
    static homeHandler(req, res) {
        res.send("Welcome to your TODO list")
    }

    static findAllTodos(req, res, next) {
        Todo.findAll()
            .then(data => {
                res.status(201).json(data)
            })
            .catch(err => {
                next(err)
            })
        
    }

    static addTodo(req, res, next) {
        let newTodo = {
            title: req.body.title,
            description: req.body.description,
            due_date: req.body.due_date,
            UserId: req.userData.id
        }
        Todo.create(newTodo)
            .then(data => {
                res.status(201).json(data)
            })
            .catch(err => {
                next(err)
            })
    }

    static deleteTodo(req, res, next) {
        let targetId = +req.params.id
        Todo.destroy({
            where: {
                id: targetId
            }
        })
        .then(() => {
            res.status(201).json({
                name: "Delete Success",
                message: "Data has been succesfully deleted."
            })
        })
        .catch(err => {
            next(err)
        })
    }
    
    static findTodoById(req, res, next) {
        let targetId = req.params.id
        Todo.findOne({
            where: {
                id: targetId
            }
        })     
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            next(err)
        })
    }

    static findAllTodoById(req, res, next) {
        let targetId = req.userData.id
        Todo.findAll({
            where: {
                UserId: targetId
            }
        })     
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            next(err)
        })
    }

    static replaceTodo(req, res, next) {
        let targetId = req.params.id
        Todo.update({
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            due_date: req.body.due_date
        },{
            where: {
                id: targetId
            }
        })     
        .then(data => {
            res.status(200).json({
                name: "Replace Success",
                message: "Data has been succesfully replaced."
            })
        })
        .catch(err => {
            next(err)
        })
    }

    static modifyTodo(req, res, next) {
        let targetId = req.params.id
        Todo.update({
            status: req.body.status,
        },{
            where: {
                id: targetId
            }
        })     
        .then(data => {
            res.status(200).json({
                name: "Update Success",
                message: "Data has been succesfully updated."
            })
        })
        .catch(err => {
            res.status(500).json(err)
        })
    }
}

module.exports = todoController