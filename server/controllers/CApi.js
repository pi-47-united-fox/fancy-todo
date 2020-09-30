const axios = require('axios')

const jikan = axios.create({
    baseURL: `https://api.jikan.moe/v3`
})

class CApi{
    static searchAnime(req,res,next){
        const query = req.query.search
        jikan
        .get(`/search/anime?q=${query}`)
        .then(({data})=>{
            res.status(200).json(data)
        })
        .catch(err=>{
           next(err)
        })
    }
}

module.exports = CApi