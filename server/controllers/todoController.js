const { Todo } = require('../models')

const axios = require('axios')

class TodoController {
    static getAllTodo(req,res,next){
        Todo.findAll({
            where: {
                UserId: req.userData.id
            }
        })
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            next(err)
        })
    }
    static getFindOneTodo(req,res,next){
        Todo.findOne({
            where: {
                id: +req.params.id
            }
        })
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            next(err)
        })
    }
    static searchMusic(artist){
        return axios({
            method: "GET",
            url: `https://api.deezer.com/search?q=${artist}`,
        })
    }
    static postCreateTodo(req,res,next){
        TodoController.searchMusic(req.body.artist)
        .then(response => {
            return Todo.create({
                title: req.body.title,
                description: req.body.description,
                status: req.body.status,
                due_date: req.body.due_date,
                artist: response.data.data[0].artist.name,
                song: response.data.data[0].title,
                link: response.data.data[0].link,
                image: response.data.data[0].artist.picture_big,
                UserId: req.userData.id
            })
        })
        .then(data => {
            res.status(201).json(data)
        })
        .catch(err => {
            next(err)
        })
    }
    static putTodo(req,res,next){
        let id = +req.params.id
        TodoController.searchMusic(req.body.artist)
        .then(response => {
            return Todo.update({
                title: req.body.title,
                description: req.body.description,
                status: req.body.status,
                due_date: req.body.due_date,
                artist: response.data.data[0].artist.name,
                song: response.data.data[0].title,
                link: response.data.data[0].link,
                image: response.data.data[0].artist.picture_big,
                UserId: req.userData.id
            },{
                where: {
                    id : id
                }
            })
        })
        .then(data => {
            res.status(200).json({message: 'todo success to update'})
        })
        .catch(err => {
            next(err)
        })
    }
    static patchTodo(req,res,next){
        const patchTodo = {
            status: req.body.status,
        }
        Todo.update(patchTodo, {
            where: {
                id: +req.params.id
            }
        })
        .then(data => {
            res.status(200).json({message: 'todo status success to update'})
        })
        .catch(err => {
            next(err)
        })
    }
    static deleteTodo(req,res,next){
        Todo.destroy({
            where: {
                id: req.params.id
            }
        })
        .then(data => {
            if(data === 1){
                res.status(200).json({message: 'todo success to delete'})
            } else {
                res.status(404).json({message: 'invalid todo'})
            }
        })
        .catch(err => {
            next(err)
        })
    }
}

module.exports = TodoController