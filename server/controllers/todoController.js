const { Todo } = require('../models')

class TodoControllers {

    static createData(req, res) {
        const inputData = {
            title: req.body.title,
            description: req.body.description,
            status: false,
            due_date: req.body.due_date,
            UserId: req.userData.id
        }
        Todo.create(inputData)
            .then(data => {
                return res.status(201).json(data)
            })
            .catch(err => {
                return res.send(500).json(err)
            })
    }

    static list(req, res) {
        Todo.findAll()
            .then(data => {
                return res.status(201).json(data)
            })
            .catch(err => {
                return res.status(500).json(err)
            })
    }

    static searchId(req, res) {
        Todo.findByPk(+req.params.id)
            .then(data => {
                return res.status(200).json(data)
            })
            .catch(err => {
                return res.status(500).json(err)
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
                return res.status(500).json(err)
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
            .catch(errors => {
                return res.status(500).json(err)
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
                return res.status(500).json(err)
            })
    }

}

module.exports = TodoControllers