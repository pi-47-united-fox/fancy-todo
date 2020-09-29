const { Todo } = require("../models")

class TodoController {
    static async getHome(req,res){
        try { 
            return res.status(200).json({
                "name":"Ok",
                "message":"Home"
            })
        } catch (error) {
            return res.status(500).json(err)
        }
    }

    static postTodo(req,res){
        // console.log(req.userData);
        req.body.UserId = req.userData.id
        console.log(req.body);
        Todo.create(req.body)
            .then(result=>{
                return res.status(201).json(result)
            })
            .catch(err=>{
                console.log(err);
                return res.status(500).json({"message":"Internal Server Error"})
            })
    }
    static getTodos(req,res){
        console.log(req.userData);
        Todo.findAll({where:{UserId:req.userData.id}})
            .then(result=>{
                return res.status(201).json(result)
            })
            .catch(err=>{
                console.log(err);
                return res.status(500).json({"message":"Internal Server Error"})
            })
    }
    static getTodo(req,res){
        Todo.findByPk(req.params.id)
            .then(result=>{
                console.log(result);
                if(result){
                    return res.status(200).json(result)
                }else{
                    return res.status(404).json({"message":"Todo Not Found"})
                } 
            })
            .catch(err=>{
                console.log(err);
                return res.status(500).json({"message":"Internal Server Error"})
            })
    }
    static putTodo(req,res){ 
        Todo.findByPk(req.params.id)
            .then(result=>{ 
                if(result){  
                    Todo.update(req.body,{where:{id:req.params.id}})
                }else{
                    return res.status(404).json({"message":"Todo Not Found"})
                }
            }) 
            .then(data=>{ 
                if(data){
                    Todo.findByPk(req.params.id)
                }else{ 
                    return res.status(500).json({"message":"Internal Server Error"}) 
                }
            }) 
            .then(data=>{
                return res.status(200).json(data)
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
                    Todo.update(req.body,{where:{id:req.params.id}})
                }else{
                    res.status(404).json({"message":"Todo Not Found"})
                }
            }) 
            .then(data=>{ 
                if(data){
                    Todo.findByPk(req.params.id)
                }else{ 
                    return res.status(500).json({"message":"Internal Server Error"}) 
                }
            }) 
            .then(data=>{
                return res.status(200).json(data)
            })
            .catch(err=>{
                console.log(err);
                return res.status(500).json({"message":"Internal Server Error"})
            })
    }
    static deleteTodo(req,res){
        Todo.destroy({where:{id:req.params.id}})
            .then(result=>{
                if(result){
                    return res.status(200).json({"message":"Todo success to delete"})
                }else{
                    return res.status(404).json({"message":"Todo Not Found"})
                }
            })
            .catch(err=>{
                console.log(err);
                return res.status(500).json({"message":"Internal Server Error"})
            })
    } 
}

module.exports = TodoController