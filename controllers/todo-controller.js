const { Todo, User } = require('../models/index')
class TodoController {
    static create(req, res, next) {
        let obj = {
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            due_date: req.body.due_date,
            userId: req.userData.id
        }
        // console.log(obj);
        Todo.create(obj, {
            include: User
        })
            .then(data => {
                // console.log(data,'kjhjkjk');
                res.status(201).json(data)
            })
            .catch(err => {
                return next(err)
            })
    }
    static findAll(req, res, next) {
        Todo.findAll()
            .then(data => {
                res.status(200).json(data)
            })
            .catch(err => {
                return next(err)
            })
    }
    static findByid(req, res, next) {
        Todo.findOne({
            where: {
                id: req.params.id
            }
        })
            .then(data => {
                res.status(200).json(data)
            })
            .catch(err => {
                return next(err)
            })
    }
    static editById(req, res, next) {
        let obj = {
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            due_date: req.body.due_date,

        }
        Todo.update(obj, {
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
                return next(err)
            })

    }
    static editStatus(req, res, next) {
        let status = { status: req.body.status }
        Todo.update(status, {
            where: {
                id: req.params.id
            }
        })
            .then(data => {
                res.status(201).json(data)
            })
            .catch(err => {
                return next(err)
            })
    }
    static deleteById(req, res, next) {
        Todo.destroy({
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
                    return res.status(400).json({
                        message: `Data not Found, failed to delete`
                    })
                }
            })
            .catch(err => {
                return next(err)
            })
    }


}

module.exports = TodoController