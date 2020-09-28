const { Todo } = require("../models")

class Controller {
    static async getHome(req,res){
        try { 
            res.status(200).json({
                "name":"Ok",
                "message":"Home"
            })
        } catch (error) {
            res.status(500).json(err)
        }
    }

    static postTodo(req,res){
        Todo.create(req.body)
            .then(result=>{
                res.status(201).json(result)
            })
            .catch(err=>{
                console.log(err);
                res.status(500).json({"message":"Internal Server Error"})
            })
    }
    static getTodos(req,res){
        Todo.findAll()
            .then(result=>{
                res.status(201).json(result)
            })
            .catch(err=>{
                console.log(err);
                res.status(500).json({"message":"Internal Server Error"})
            })
    }
    static getTodo(req,res){
        Todo.findByPk(req.params.id)
            .then(result=>{
                console.log(result);
                if(result){
                    res.status(200).json(result)
                }else{
                    res.status(404).json({"message":"Todo Not Found"})
                } 
            })
            .catch(err=>{
                console.log(err);
                res.status(500).json({"message":"Internal Server Error"})
            })
    }
    static putTodo(req,res){ 
        Todo.findByPk(req.params.id)
            .then(result=>{ 
                if(result){  
                    return Todo.update(req.body,{where:{id:req.params.id}})
                }else{
                    res.status(404).json({"message":"Todo Not Found"})
                }
            }) 
            .then(data=>{ 
                if(data){
                    return Todo.findByPk(req.params.id)
                }else{ 
                    res.status(500).json({"message":"Internal Server Error"}) 
                }
            }) 
            .then(data=>{
                res.status(200).json(data)
            })
            .catch(err=>{
                console.log(err);
                res.status(500).json({"message":"Internal Server Error"})
            })
    }
    static patchTodo(req,res){
        Todo.findByPk(req.params.id)
            .then(result=>{ 
                if(result){  
                    return Todo.update(req.body,{where:{id:req.params.id}})
                }else{
                    res.status(404).json({"message":"Todo Not Found"})
                }
            }) 
            .then(data=>{ 
                if(data){
                    return Todo.findByPk(req.params.id)
                }else{ 
                    res.status(500).json({"message":"Internal Server Error"}) 
                }
            }) 
            .then(data=>{
                res.status(200).json(data)
            })
            .catch(err=>{
                console.log(err);
                res.status(500).json({"message":"Internal Server Error"})
            })
    }
    static deleteTodo(req,res){
        Todo.destroy(req.params.id)
            .then(result=>{
                if(result){
                    res.status(200).json({"message":"Internal Server Error"})
                }else{
                    res.status(404).json({"message":"Todo Not Found"})
                }
            })
            .catch(err=>{
                res.status(500).json({"message":"Internal Server Error"})
            })
    } 
}

module.exports = Controller