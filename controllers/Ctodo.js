const {Todo} = require('../models/index')

class CTodo{
    static async listHandler(req,res){
    }

    static addHandler(req,res){
        const input = {
            title: req.body.title,
            description: req.body.description,
            due_date: req.body.date
        }

        Todo.create(input)
        .then(data=>{
             res.status(200).json(data)
        })
        .catch(err=>{
            res.status(500).json(err)
        })
    }
}

module.exports = CTodo