const axios = require('axios')

const earthquake = axios.create({
    baseURL: 'https://earthquake.usgs.gov/fdsnws/event/1'
})

const premierleague = axios.create({
    baseURL: 'https://fantasy.premierleague.com/entry/1164829/event'
})
const premierleagueWeek = axios.create({
    baseURL: 'https://fantasy.premierleague.com/api/bootstrap-static/'
})
const deezer = axios.create({
    baseURL: 'https://api.deezer.com'
})

class ApiController {
    static earthquake(req,res,next) {
        const start = `${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()-1}`
        const end = `${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()}`
        earthquake.get (`/query?format=geojson&starttime=${start}&endtime=${end}`)
        .then(result=> {
            console.log(result.data.features)
            result.data.features.forEach(el=> {
                if(el.geometry.coordinates[0] < 141 && el.geometry.coordinates[0] > 95 && el.geometry.coordinates[1] > -6 && el.geometry.coordinates[1] <  11) {
                    let obj = {
                        place: el.properties.place,
                        magnitude: el.properties.mag,
                        type: el.properties.type,
                        //tsunamiPotensial: 
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
    static searchMusic(req, res, next) {
        const querySearch = req.query.search
        deezer.get(`/search?q=${querySearch}`)
        .then(result=> {
            res.status(200).json(result.data.results)
        })
        .catch(err=> {
            res.status(500).json(err)
        })
    }
    static premierLeagueWeek(req,res,next) {
        premierleagueWeek.get('/')
        .then()
        .catch()
    }
   
}
module.exports = ApiController