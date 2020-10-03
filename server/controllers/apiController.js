const axios = require('axios')
const { Todo } = require('../models/index')

const deezer = axios.create({
    baseURL: `https://api.deezer.com`
})

class ApiController{
    static searchMusic(req, res, next){
        const query = req.query.search
        deezer.get(`/search?q=${query}`)
            .then(({ data }) => {
                // console.log(result.data.data)
                res.status(200).json(data)
            })
            .catch(err => {
                // res.status(500).json(err)
                next(err)
            })
    }

    static addMusic(req, res, next){
        // let desc = null
        Todo.findByPk(+req.params.id)
            .then(data => {
                // console.log(data)
                const query = data.title
                // desc = data.description
                // console.log(query)
                return deezer.get(`/search?q=${query}`)

            })
            .then(({ data }) => {
                let dailyTrack = ''
                data.data.forEach((el, index) => {
                    if(index < 3){
                        dailyTrack += ` \n${el.title}: ${el.link}`
                    }
            
                })
                console.log(dailyTrack)
                let obj = {
                    track: dailyTrack
                }

                return Todo.update(obj, {
                    where:{
                        id: +req.params.id
                    }
                })
            })
            .then(result => {
                console.log(result)
                res.status(200).json(result)
            })
            .catch(err => {
                next(err)
            })
    }
}

module.exports = ApiController