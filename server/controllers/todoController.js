const getWeather = require("../helpers/weatherApi");
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

    static postTodo(req,res,next){
        // console.log(req.userData);
        req.body.UserId = req.userData.id
        // console.log(new Date(req.body.due_date).getDate(), "<<<<<<<<");
        // console.log(req.body);
        Todo.create(req.body)
            .then(result=>{
                return res.status(201).json(result)
            })
            .catch(err=>{
                console.log(err);
                return next(err)
            })
    }
    
    static getTodos(req,res){
        // console.log(req.userData);
        Todo.findAll({where:{UserId:req.userData.id},order:[['due_date','ASC']]})
            .then(result=>{ 
                // getWeather(result)
                result.forEach(element => { 
                    // console.log(element.epoch); 
                    element.dataValues.epoch = element.epoch
                    // console.log(element.dataValues);
                });
                return res.status(201).json(result)
            })
            .catch(err=>{
                return next(err)
                // return res.status(500).json({"message":"Internal Server Error"})
            })
    }
    // static getTodos(req,res){
    //     console.log(req.userData);
    //     Todo.findAll({where:{UserId:req.userData.id}})
    //         .then(result=>{
    //             console.log(result[0].epoch,"<<<<<<<<<");
    //             return res.status(201).json(result)
    //         })
    //         .catch(err=>{
    //             console.log(err);
    //             return res.status(500).json({"message":"Internal Server Error"})
    //         })
    // }
    static getTodo(req,res,next){
        Todo.findByPk(req.params.id)
            .then(result=>{
                // console.log(result);
                if(result){  
                    // console.log(result.epoch,"<<<<<<<<<", result.due_date,">>>", (new Date(Number(result.due_date)+1)) );
                    
                    return res.status(200).json(result)
                }else{
                    return res.status(404).json({"message":"Todo Not Found"})
                } 
            })
            .catch(err=>{ 
                return next(err)
            })
    }
    static putTodo(req,res,next){ 
        // console.log(req.body);
        // console.log(req.params.id);
        Todo.findByPk(req.params.id)
            .then(result=>{ 
                if(result){  
                    return Todo.update(req.body,{where:{id:req.params.id}})
                }else{
                    return res.status(404).json({"message":"Todo Not Found"})
                }
            }) 
            .then(data=>{ 
                if(data){
                    return res.status(201).json(data)
                }else{ 
                    console.log(data,"<<<<<<<<<<<<<<<<<<<<<<<");
                    // return next({})
                    return res.status(500).json({"message":"Internal Server Error"}) 
                }
            })  
            .catch(err=>{
                return next(err)
            })
    }
    static patchTodo(req,res){
        Todo.findByPk(req.params.id)
            .then(result=>{ 
                if(result){  
                    return Todo.update({status:"Done"},{where:{id:req.params.id}})
                }else{
                    res.status(404).json({"message":"Todo Not Found"})
                }
            }) 
            .then(data=>{ 
                if(data){
                    return res.status(200).json(data)
                }else{ 
                    return res.status(500).json({"message":"Internal Server Error"}) 
                }
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