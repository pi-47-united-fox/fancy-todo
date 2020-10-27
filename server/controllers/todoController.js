const { Todo } = require("../models/index")

class TodoController {
    static homeHandler(req, res) {
        res.send("Welcome to your TODO list")
    }

    static findAllTodos(req, res, next) {
        Todo.findAll({
            order: [['due_date', 'DESC']]
        })
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
                res.json(err)
                // next(err)
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
                message: "Data has been succesfully edited."
            })
        })
        .catch(err => {
            // console.log(err)
            next(err)
        })
    }

    static modifyTodo(req, res, next) {
        let targetId = req.params.id
        Todo.update({
            status: "Completed",
        },{
            where: {
                id: targetId
            }
        })     
        .then(data => {
            res.status(200).json({
                message: "Data has been succesfully updated."
            })
        })
        .catch(err => {
            next(err)
        })
    }
}

module.exports = TodoController