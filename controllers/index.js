const {Todo} = require('../models')

class TodoController{
    static async getTodoHandler(req,res){
        try {
            const todo = await Todo.findAll()
            res.status(200).json(todo)
            
        } catch (error) {
            res.status(500).json(error)
        }
         
    }

    static async createTodoHandler(req,res){
        const { title,description,status,due_date } = req.body
        const newTodo = {
            title,description,status,due_date
        }
        try {
            const createTodo = await Todo.create(newTodo)
            res.status(200).json({message:'berhasil create',createTodo})
        } catch (error) {
            console.log(error)
            res.status(500).json({error})
        }
    }

}


module.exports = TodoController