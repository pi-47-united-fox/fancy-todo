const { Todo } = require("../models/index")

class todoController {
    static homeHandler(req, res) {
        res.send("Welcome to your TODO list")
    }

    static findAllTodos(req, res) {
        Todo.findAll()
            .then(data => {
                res.status(201).json(data)
            })
            .catch(err => {
                res.status(500).json(err)
            })
        
    }

    static addTodo(req, res) {
        let newTodo = {
            title: req.body.title,
            description: req.body.description,
            due_date: req.body.due_date
        }
        Todo.create(newTodo)
            .then(data => {
                res.status(201).json(data)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }

    static deleteTodo(req, res) {
        let targetId = +req.params.id
        Todo.destroy({
            where: {
                id: targetId
            }
        })
        .then(data => {
            res.status(201).json({
                name: "Delete Success",
                message: "Data has been succesfully deleted."
            })
        })
        .catch(err => {
            res.status(500).json(err)
        })

    }
    
    static findTodoById(req, res) {
        let targetId = +req.params.id
        Todo.findOne({
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

    static replaceTodo(req, res) {
        let targetId = +req.params.id
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
            res.status(200).json(data)
        })
        .catch(err => {
            res.status(500).json(err)
        })
    }

    static modifyTodo(req, res) {
        let targetId = +req.params.id
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
}

module.exports = todoController