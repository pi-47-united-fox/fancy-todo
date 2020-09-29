const { Todo } = require("../models")

class TodoController {
    // get/todos
    static getDataTodo(req, res) {
        console.log(req.userData.name)
        Todo.findAll({ where: { UserId: req.userData.id } })
            .then(result => {
                res.status(200).json(result)
            })
            .catch(err => {
                res.status(500)
            })
    }
    // post/todos
    static postInputTodo(req, res) {
        console.log(req.userData.id)
        let value = {
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            due_date: req.body.due_date,
            UserId: req.userData.id
        }
        Todo.create(value)
            .then(data => {
                res.status(201).json(data)
            })
            .catch(err => {
                res.status(500).json(err)
            })

    }

    //Get /todos/:id
    static findTodoById(req, res) {
        let newid = req.params.id
        Todo.findByPk(newid)
            .then(data => {
                res.status(200).json(data)
            })
            .catch(err => {
                res.status(404).json({ message: "not found data" })
            })

    }
    //Put /todos/:id
    static updateTodoById(req, res) {
        if (req.body.status === "undone") {
            req.body.status = false
        } else if (req.body.status === "done") {
            req.body.status = true
        }

        let newid = req.params.id
        let value = {
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            due_date: new Date(req.body.due_date)
        }
        Todo.update(value, {
            where: {
                id: newid
            },
            returning: true,
            plain: true

        })
            .then(data => {
                res.status(200).json(data[1])
            })
            .catch(err => {
                res.status(404).json({ message: "user not found" })
            })
    }

    //Patch /todos/:id
    static changeStatusTodo(req, res) {
        if (req.body.status === "undone") {
            req.body.status = false
        } else if (req.body.status === "done") {
            req.body.status = true
        }
        let value = {
            status: req.body.status
        }
        Todo.update(value, {
            where: {
                id: req.params.id,
            },
            returning: true,
            plain: true

        })
            .then(data => {
                console.log(data)
                res.status(200).json(data[1])
            })
            .catch(err => {
                res.status(500).json(err)
            })

    }

    //DELETE /todos/:id
    static deleteTodoById(req, res) {

        Todo.destroy({
            where: {
                id: req.params.id
            }
        })
            .then(data => {
                if (data === 1) {
                    res.status(200).json({ message: "todo succses to delete" })
                } else {
                    res.status(404).json({ message: "error not found" })
                }
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }

}

module.exports = TodoController