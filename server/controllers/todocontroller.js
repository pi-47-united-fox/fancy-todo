const { Todo } = require("../models")

class TodoController {
    // get/todos
    static getDataTodo(req, res) {
        Todo.findAll()
            .then(result => {
                res.status(200).send(result)
            })
    }
    // post/todos
    static postInputTodo(req, res) {
        console.log(req.body)
        let status = false
        if (req.body.status === "belum") {
            status = false
        } else if (req.body.status === "sudah") {
            status = true
        } else {
            res.status(400).send("invalid input")
        }
        if (!req.body.due_date) {

        }



        res.send(req.body)
        let value = {
            title: req.body.title,
            description: req.body.description,
            status: status,
            due_date: new Date(req.body.date)
        }

    }
    //Get /todos/:id
    static findTodoById(req, res) {
        res.send("todosgetid")
    }
    //Put /todos/:id
    static updateTodoById(req, res) {

    }

    //Patch /todos/:id
    static changeStatusTodo(req, res) {

    }

    //DELETE /todos/:id
    static deleteTodoById(req, res) {

    }

}

module.exports = TodoController