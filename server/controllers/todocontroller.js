const { Todo } = require("../models")

class TodoController {
    // get/todos
    static getDataTodo(req, res) {
        Todo.findAll()
            .then(result => {

            })
    }
    // post/todos
    static postInputTodo(req, res) {

        res.send("todospost")
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