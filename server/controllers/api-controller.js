const axios = require('axios')

class ApiController {
    static currentWeather(req, res, next) {
        let key  ='792d5bdeb0dcf09189634b39809452ca'
        let city = 'jakarta' //
        axios({
            method: 'GET',
            url: 'https://api.openweathermap.org/data/2.5/weather?q=' + [city] +'&units=imperial&appid=' + [key]
        })
        .then(({data}) => {
            console.log(Math.floor(5/9*(data.main.temp-32)),'Celcius');
            return res.status(200).json(data)
        })
        .catch(err => {
            return next(err)
        })
    }
}

module.exports = ApiController