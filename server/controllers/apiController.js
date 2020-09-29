const axios = require('axios')

const deeezer = axios.create({
    baseURL: `https://api.deezer.com`
})

class ApiController{
    static searchMusic(req, res, next){
        const query = req.query.search
        axios({
            method: 'GET',
            url: `https://api.deezer.com/search?q=${query}`
        })
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
        
    }
}

module.exports = ApiController