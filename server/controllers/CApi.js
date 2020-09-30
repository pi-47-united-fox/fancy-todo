const axios = require('axios')
const {Todo} = require('../models/index')

const jikan = axios.create({
    baseURL: `https://api.jikan.moe/v3`
})

class CApi{
    static searchAnime(req,res,next){
        const query = req.query.search
        jikan
        .get(`/search/anime?q=${query}`)
        .then(({data})=>{
            //res.status(200).json(data)
            let title = data.results[0].title
            let description = data.results[0].synopsis
            let due_date = req.body.due_date
            let UserId = +req.userData.id
            let obj = {
                title,
                description,
                due_date,
                UserId
            }
            return Todo.create(obj)
        })
        .then(data=>{
            res.status(201).json(data)
        })
        .catch(err=>{
           next(err)
        })
    }
}

module.exports = CApi