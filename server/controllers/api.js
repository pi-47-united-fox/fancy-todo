const axios = require('axios')

const tmdb = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    params: {
        api_key: 'af570e1e2b53e7ccbe9cdf6c77174319'
    }
})

const zomato = axios.create({
    baseURL: 'https://developers.zomato.com/api/v2.1',
    header: {
        apikey: 'fb21e803d67c86145e20b125d10b05fa'
    }
})

class ApiController {
    static async searchMovies(req, res, next) {
        const query = req.query.search
        try {
            const movies = await tmdb.get(`search/movie?query=${query}`)
            // console.log(movies.data)
            return res.status(200).json(movies.data)

        } catch (err) {
            if (err.name == 'Error') {
                return next({
                    name: 'Unauthorized',
                    messages: 'invalid API key'
                })
            } else {
                return next(err)
            }
        }
    }

    // http://localhost:3000/restaurant?res_id=16774318
    static async searchRestaurant(req, res, next) {
        const query = req.query.res_id
        try {
            const restaurant = await zomato.get(`?res_id=${query}`)
            console.log(restaurant)
            return res.status(200).json(restaurant)

        } catch (err) {
            if (err.name == 'Error') {
                return next(err)
            } else {
                return next(err)
            }
        }
    }

}

module.exports = ApiController