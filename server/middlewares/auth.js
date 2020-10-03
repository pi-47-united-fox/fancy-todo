const { User,Todo } = require("../models/index")
const { verify } = require("../helpers/jwt")

function authentication(req,res,next){ 
    console.log("checking auth --");
    const {access_token} = req.headers
    console.log(access_token);
    if(access_token){ 
        req.userData = verify(access_token)
        console.log(req.userData,"<<<<<");
        User.findByPk(req.userData.id) 
        .then(data => {
            if(!data){
                res.status(404).json({message : 'User Not found'})
            }else{ 
                next()
            }
        })
        .catch(err => {
            res.status(500).json({message : err.message})
        })
    } else {
        next({name:'Unauthenticated',message:"You are not Authenticated"})
        // res.status(401).json({message : 'You are Authenticated'})
    } 
}
function authorization(req,res,next){ 
    const {id} = req.params
    const userData = req.userData.id
    Todo.findByPk(id)
    .then(data => {
        if(!data){
            res.status(404).json({message : 'Data Todo Not Found'})
        } else if(userData !== data.UserId){
            next({name:"Forbidden",message:"You dont have access"})
            // res.status(403).json({message : 'You dont have access'})
        } else {
            next()
        }
    })
    .catch(err => {
        res.status(500).json({message : err.message})
    })
}

module.exports = {authentication, authorization}