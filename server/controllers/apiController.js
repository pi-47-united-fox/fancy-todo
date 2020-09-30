const axios = require('axios')

class ApiController {
    static holiday2020(req, res, next) {
        axios.get(`https://date.nager.at/api/v2/publicholidays/2020/ID`)
            .then(({ data }) => {
                res.status(200).json(data)
            })
            .catch(err => {
                return next(err)
            })
    }

    static calendarID(req, res, next) {
        const { year } = req.params
        axios.get(`https://calendarific.com/api/v2/holidays?api_key=${process.env.CALENDARIFICAPIKEY}&country=ID&year=${year}`)
            .then(({ data }) => {
                res.status(200).json(data)
            })
            .catch(err => {
                return next(err)
            })
    }
}

module.exports = ApiController