const { Task } = require('../models/index')
class TaskController {
    static taskCreate(req, res) {
        let obj = {
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            due_date: req.body.due_date
        }
        console.log(obj);
        Task.create(obj)
            .then(data => {
                res.status(201).json(data)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }
    static taskFindAll(req, res) {
        Task.findAll()
            .then(data => {
                res.status(200).json(data)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }
    static taskFindByid(req, res) {
        Task.findOne({
            where: {
                id: req.params.id
            }
        })
            .then(data => {
                res.status(200).json(data)
            })
            .catch(err => {
                res.status(404).json(err)
            })
    }
    static editById(req, res) {
        let obj = {
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            due_date: req.body.due_date
        }
        Task.update(obj, {
            where: {
                id: req.params.id
            }
        })
            .then(data => {
                res.status(201).json({
                    message: 'Update successfully'
                })
            })
            .catch(err => {
                res.status(500).json(err)
            })

    }
    static editStatus(req, res) {
        let status = { status : req.body.status }
        Task.update(status, {
            where: {
                id: req.params.id
            }
        })
            .then(data => {
                res.status(201).json(data)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }
    static taskDeleteById(req, res) {
        Task.destroy({
            where: {
                id: req.params.id
            }
        })
            .then(data => {
                if (data) {
                    res.status(201).json({
                        message: `deleted successfully`
                    })
                } else {
                    res.status(400).json({
                        message: `Data not Found, failed to delete`
                    })
                }
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }


}

module.exports = TaskController