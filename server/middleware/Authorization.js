
const { Todo } = require('../models')

const Authorization=(req,res,next)=>{
    const id = +req.params.id
    Todo.findByPk(id)
        .then(result=>{
            if(!result){
                res.status(404).json({message:'Todo not found'})
            }else if(req.userData.id !== result.UserId){
                res.status(401).json({message:'Not Authorized'})
            }else{
                next() 
            }
        })
        .catch(err=>{
            console.log(err)
            res.status(500).json({message:err})
        })
}


module.exports = {
    Authorization
}