const axios = require('axios')

const iTunes = axios.create({
    baseURL: 'https://itunes.apple.com'
})


class ApiController {
    static searchMusic(req, res, next) {
        const querySearch = req.query.search
        iTunes.get (`/search?term=${querySearch}`)
        .then(result=> {
            console.log(result)
            res.status(200).json(result.data)
        })
        .catch(err=> {
            res.status(500).json(err)
        })
    }
   
}
module.exports = ApiController