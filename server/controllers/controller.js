const { Todo } = require('../models')

class TodoControllers {

    static createData(req, res) {
        const inputData = {
            title: req.body.title,
            description: req.body.description,
            status: false,
            due_date: req.body.due_date
        }
        Todo.create(inputData)
            .then(data => {
                return res.status(201).json(data)
            })
            .catch(err => {
                return res.send(400)
            })
    }

    static list(req, res) {
        Todo.findAll()
            .then(data => {
                return res.status(201).json(data)
            })
            .catch(err => {
                return res.status(400)
            })
            .catch(err => {
                return res.status(500)
            })
    }

    static searchId(req, res) {
        Todo.findByPk(+req.params.id)
            .then(data => {
                return res.status(200).json(data)
            })
            .catch(err => {
                return res.status(404).json({ error: `error not found` })
            })
    }

    static editData(req, res) {
        const editData = {
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            due_date: req.body.due_date
        }
        Todo.update(editData, {
            where: {
                id: +req.params.id
            }
        })
            .then(data => {
                return res.status(200).json(data)
            })
            .catch(err => {
                return res.status(400).json({ msg: "validation errors" })
            })
            .catch(err => {
                return res.status(404).json({ msg: "error not found" })
            })
            .catch(errors => {
                return res.status(500).json({ msg: "validation errors" })
            })
    }

    static editElement(req, res) {
        const editStatus = {
            status: req.body.status
        }
        Todo.update(editStatus, {
            where: {
                id: +req.params.id
            }
        })
            .then(data => {
                return res.status(200).json(data)
            })
            .catch(err => {
                return res.status(404)
            })
            .catch(errors => {
                return res.status(500)
            })
    }

    static deleteData(req, res) {
        Todo.destroy({
            where: {
                id: req.params.id
            }
        })
            .then(data => {
                return res.status(200).json({ msg: `todo sucess to delete` })
            })
            .catch(err => {
                return res.status(404).json({ errors: `error not found` })
            })
            .catch(errServers => {
                return res.status(500)
            })
    }

}

module.exports = TodoControllers