const { Todo } = require('../models')
const axios = require('axios');
const MoviesControllers = require('./movieController');
class TodoControllers {

    static createData(req, res) {
        const query = req.query.search
        axios({
            method: 'GET',
            url: `https://developers.zomato.com/api/v2.1/search?q=${query}`,
            headers: {
                'user-key': 'fb21e803d67c86145e20b125d10b05fa'
            }
        })
        // .then(resto => {
        // let foodName = resto.restaurants[0].restaurant.name
        // let location = resto.restaurants[0].restaurant.locality_verbose
        // let link = resto.restaurants[0].restaurant.url
        let inputData = {
            title: req.body.title,
            description: req.body.description,
            status: false,
            due_date: new Date(),
            UserId: req.userData.id,
            food: 'foodName',
            location: 'location',
            link: 'link'
        }
        // return
        // })
        Todo.create(inputData)
            .then(data => {
                return res.status(201).json(data)
            })
            .catch(err => {
                return res.send(500).json(err)
            })

    }

    static list(req, res) {
        let idUser = req.userData.id
        Todo.findAll({
            where: {
                UserId: idUser
            }
        })
            .then(data => {
                return res.status(200).json(data)
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