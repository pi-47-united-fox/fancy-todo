const axios = require("axios")

// function weatherApi(){

    const weatherApi = axios.create({
        baseURL: 'https://api.openweathermap.org/data/2.5',
        params:{
            appid:"3831ab7b001792d16aebd7f980f99967",
            timezone:"Asia/Jakarta",
            lat:6.2088,
            lon:106.8456
        }
    });
// }

module.exports = weatherApi