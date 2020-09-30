const axios = require('axios');

const tmdb = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    params: {
        api_key: 'af570e1e2b53e7ccbe9cdf6c77174319'
    }
})

// const zomato = axios.create({
//     baseURL: 'https://developers.zomato.com/api/v2.1',
//     headers: {
//         'user-key': 'fb21e803d67c86145e20b125d10b05fa'
//     }
// })

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

    // https://developers.zomato.com/api/v2.1/search?q=Mie%20Aceh
    static searchResto(req, res, next) {
        const query = req.query.search
        axios({
            method: 'GET',
            url: `https://developers.zomato.com/api/v2.1/search?q=${query}`,
            headers: {
                'user-key': 'fb21e803d67c86145e20b125d10b05fa'
            }
        })
            .then(({ data }) => {
                // console.log(data.restaurants)
                console.log(data.restaurants[0].restaurant.name)
                return res.status(200).json(data.restaurants)
            })
            .catch(err => {
                // res.status(500).json(err)
                return next(err)
            })
    }

}

module.exports = ApiController