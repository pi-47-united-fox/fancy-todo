const {Todo} = require('../models/index')

class CTodo{
    static listHandler(req,res,next){
        Todo.findAll({where:{
            UserId: +req.userData.id
        }})
        .then(data=>{
            res.status(200).json(data)
        })
        .catch(err=>{
            next(err)
        })

    }

    static addHandler(req,res,next){
        const input = {
            title: req.body.title,
            description: req.body.description,
            due_date: req.body.due_date,
            UserId: +req.userData.id
        }
        Todo.create(input)
        .then(data=>{
            res.status(201).json(data)
        })
        .catch(err=>{
            next(err)
        })
    }

    static async findHandler(req,res,next){
        try{
           const resultFind = await Todo.findByPk(+req.params.id)

           if(resultFind){
               res.status(200).json(resultFind)
           }
           else{
            next({name: 'Not Found', message: 'Data not found!'})
           }
        }
        catch(err){
            next(err)
        }
    }

    static async putHandler(req,res){
        try{
            const inputBody = {
                title: req.body.title,
                description: req.body.description,
                status: req.body.status,
                due_date: req.body.due_date,
                UserId: req.userData.id
            }
            const resultPut = await Todo.update(inputBody,{where:{
                id:+req.params.id
            }})

            if(!resultPut[0]){
                res.status(404).json({message:'Not found'})
            }
            else{
                res.status(200).json(await Todo.findByPk(+req.params.id))
            }
        }   
        catch(err){
            if (err.name === "SequelizeValidationError") {
				res.status(400).json(err.errors);
			} else {
				res.status(500).json({ message: err });
			}
        }
    }

    static async patchHandler(req,res){
        try{
            const inputBody = { status: req.body.status, UserId: req.userData.id}
            
            const resultPatch = await Todo.update(inputBody,{where:{
                id:+req.params.id
            }})

            if(!resultPatch[0]){
                next({name: 'Not Found', message: 'Data not found!'})
            }
            else{
                res.status(200).json(await Todo.findByPk(+req.params.id))
            }
        }
        catch(err){
            if (err.name === "SequelizeValidationError") {
				res.status(400).json(err.errors);
			} else {
				res.status(500).json({ message: err });
			}
        }

    }

    static async deleteHandler(req,res){
        try{
            const resultDelete = await Todo.destroy({where:{id:+req.params.id}})

            if(resultDelete){
                res.status(200).json({message: "todo success to delete"})
            } 
            else{
                res.status(404).json({message: "Not found"})
            }

        }
        catch(err){
            next(err)
        }
    }
    
}

module.exports = CTodo