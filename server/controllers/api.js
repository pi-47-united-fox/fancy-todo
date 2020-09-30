const axios = require('axios')

const iTunes = axios.create({
    baseURL: 'https://itunes.apple.com'
})
const earthquake = axios.create({
    baseURL: 'https://earthquake.usgs.gov/fdsnws/event/1'
}) 

class ApiController {
    static searchMusic(req, res, next) {
        const querySearch = req.query.search
        iTunes.get (`/search?term=${querySearch}`)
        .then(result=> {
            res.status(200).json(result.data.results)
        })
        .catch(err=> {
            res.status(500).json(err)
        })
    }
    static showGhibli(req,res,next) {
        axios({
            method: 'get',
            url: 'https://ghibliapi.herokuapp.com/films/',
          })
        .then(result=> {
            console.log(result.data)
            res.status(200).json(result.data)
        })
        .catch(err=> {
            res.status(500).json(err)
        })
    }
    static earthquake(req,res,next) {
        const start = `${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()-1}`
        const end = `${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()}`
        earthquake.get (`/query?format=geojson&starttime=${start}&endtime=${end}`)
        .then(result=> {
            console.log(result.data.features)
            result.data.features.forEach(el=> {
                if(el.geometry.coordinates[0] < 141 && el.geometry.coordinates[0] > 95 && el.geometry.coordinates[1] > -6 && el.geometry.coordinates[1] <  11){
                    let obj = {
                        place: el.properties.place,
                        magnitude: el.properties.mag,
                        type: el.properties.type
                    }
                    let array = []
                    array.push (obj)
                    res.status(200).json(array)
                }
            })
        })
        .catch(err=> {
            res.status(500).json(err)
        })
    }
   
}
module.exports = ApiController