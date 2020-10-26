const axios = require('axios')

class ApiController {
    static getHoliday(req, res, next) {
        axios.get(`https://calendarific.com/api/v2/holidays?api_key=${process.env.CALENDARIFICAPIKEY}&country=ID&year=2020`)
            .then(({ data }) => {
                res.status(200).json(data)
            })
            .catch(err => {
                return next(err)
            })
    }

    static searchHoliday(req, res, next) {
        const { country, year } = req.body
        axios.get(`https://calendarific.com/api/v2/holidays?api_key=${process.env.CALENDARIFICAPIKEY}&country=${country}&year=${year}`)
            .then(({ data }) => {
                res.status(200).json(data)
            })
            .catch(next)
    }
}

module.exports = ApiController