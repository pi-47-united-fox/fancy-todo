const {Todo} = require('../models')
const axios = require('axios')

class TodoController{
    static async getTodoHandler(req,res){
        try {
            const todo = await Todo.findAll({
                where:{UserId:req.userData.id},
                order:[['id','asc']]

            })
            res.status(200).json(todo)
            
        } catch (error) {
            console.log(error)
            res.status(500).json({error})
        }
         
    }

    static async getTodoByIdHandler(req,res){
        let id = +req.params.id
        try {
            const todoById = await Todo.findByPk(id)
            if(todoById){
                res.status(200).json(todoById)
            }else{
                res.status(404).json({message:'id tidak ditemukan'})
            }
        } catch (error) {
            res.status(500).json({error})
        }
    }

    static createTodoHandler(req,res){
        let query = req.query.pokemon
        const UserId = req.userData.id
        let querytolower = query.toLowerCase()
        console.log(querytolower)
        console.log(UserId)

        axios.get(`https://pokeapi.co/api/v2/pokemon/${querytolower}`)
            .then(({data})=>{
                if(data){
                    let newData = {
                        title:data.name,
                        description:'Hunt this Pokemon in 7 days !',
                        status:'not catched yet',
                        due_date:new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
                        UserId,
                        imageurl:data.sprites.front_default
                    }
                    return Todo.create(newData)
                }else{
                    return res.status(404).json({message:'not found'})
                }
            })
            .then((result2)=>{
                return res.status(201).json({message:'berhasil create',result2})
            })
            .catch(err=>{
                console.log(err)
                return res.status(500).json({err})
            })
    }

    static async putTodoHandler(req,res){
        console.log('masuk put')
        let id = +req.params.id
        const { title,description,status,due_date } = req.body
        const updatedTodo = {
            title,description,status,due_date,UserId:req.userData.id
        }

        if(!title){
            res.status(400).json({message:'title tidak boleh kosong'})
        }else if(!description){
            res.status(400).json({message:'description tidak boleh kosong'})
        }else if(!status){
            res.status(400).json({message:'status tidak boleh kosong'})
        }else if(!due_date){
            res.status(400).json({message:'due_date tidak boleh kosong'})
        }else{
            try {
                const putTodo = await Todo.update(updatedTodo,{where:{id}})
                res.status(201).json({message:'berhasil update dengan put',putTodo})
            } catch (error) {
                console.log(error)
                res.status(500).json({error})
            }
        }
    }
    
    static async patchTodoHandler(req,res){
        let id = +req.params.id
        console.log(id)
        const { status } = req.body
        console.log(status)
        const newStatus = { status }

        if(!status){
            res.status(400).json({message:'status harus ada'})
        }else{
            try {
                const updatedStatus = await Todo.update(newStatus,{
                    where:{id},
                })
                res.status(201).json({message:'berhasil update status dengan patch',updatedStatus})
            } catch (error) {
                console.log(error)
                res.status(500).json({error})
            }
        }
        
    }


    static async deleteTodoHandler(req,res){
        let id = +req.params.id
        try {
        const deletedTodo = await Todo.destroy({where:{id}})
        if(deletedTodo>0){
            res.status(200).json({message:'berhasil delete'})
        }else{
            res.status(404).json({message:'id tidak ditemukan'})
        }
        } catch (error) {
            console.log(error)
            res.status(500).json({error})
        }

    }

}


module.exports = {
    TodoController
}