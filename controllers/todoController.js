const {Todo} = require('../models')

class TodoController{
    static async getTodoHandler(req,res){
        try {
            const todo = await Todo.findAll({where:{UserId:req.userData.id}})
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

    static async createTodoHandler(req,res){
        const { title,description,status,due_date } = req.body
        const UserId = req.userData.id
        const newTodo = {
            title,description,status,due_date,UserId
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
                const createTodo = await Todo.create(newTodo)
                res.status(201).json({message:'berhasil create',createTodo})
            } catch (error) {
                console.log(error)
                res.status(500).json({error})
            }
        }
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
        const { status } = req.body
        const newStatus = { status }

        if(!status){
            res.status(400).json({message:'status harus ada'})
        }else{
            try {
                const updatedStatus = await Todo.update(newStatus,{where:{id}})
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