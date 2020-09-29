const { Todo } = require("../models")
const axios = require("axios")


class TodoController {
    // get/todos
    static getDataTodo(req, res, next) {

        Todo.findAll({ where: { UserId: req.userData.id } })
            .then(result => {
                res.status(200).json(result)
            })
            .catch(err => {
                next(err)
            })
    }
    // post/todos
    static postInputTodo(req, res, next) {
        if (req.query.food) {
            axios({
                method: "GET",
                url: `https://developers.zomato.com/api/v2.1/search?q=${req.query.food}`,
                headers: {
                    "user-key": process.env.USER_KEY
                }
            })
                .then(response => {
                    let addressResto = response.data.restaurants[0].restaurant.location.address
                    let nameResto = response.data.restaurants[0].restaurant.name
                    let value = {
                        title: req.body.title,
                        description: `${req.body.description} ${nameResto} alamat terdekat : ${addressResto}`,
                        status: req.body.status,
                        due_date: req.body.due_date,
                        UserId: req.userData.id
                    }
                    return Todo.create(value)
                })
                .then(data => {
                    res.status(201).json(data)
                })
                .catch(err => {
                    next(err)
                })
        } else {
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
                    next(err)
                })
        }
    }

    //Get /todos/:id
    static findTodoById(req, res, next) {
        let newid = req.params.id
        Todo.findByPk(newid)
            .then(data => {
                res.status(200).json(data)
            })
            .catch(err => {
                next(err)
            })

    }
    //Put /todos/:id
    static updateTodoById(req, res, next) {

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
            individualHooks: true,
            returning: true
        })
            .then(data => {
                res.status(200).json(data[1][0])
            })
            .catch(err => {
                next(err)
            })
    }

    //Patch /todos/:id
    static changeStatusTodo(req, res, next) {

        let value = {
            status: req.body.status
        }
        Todo.update(value, {
            where: {
                id: req.params.id,
            },
            individualHooks: true,
            returning: true,
        })
            .then(data => {
                res.status(200).json(data[1][0])
            })
            .catch(err => {
                next(err)
            })

    }

    //DELETE /todos/:id
    static deleteTodoById(req, res, next) {

        Todo.destroy({
            where: {
                id: req.params.id
            }
        })
            .then(data => {
                if (data === 1) {
                    res.status(200).json({ message: "todo succses to delete" })
                }
            })
            .catch(err => {
                next(err)
            })
    }

}

module.exports = TodoController