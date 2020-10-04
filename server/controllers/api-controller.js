const axios = require('axios')
const weatherApi = process.env.WEATHERAPI

class ApiController {
    static currentWeather(req, res, next) {
        let key  = weatherApi
        let city = 'jakarta' //
        axios({
            method: 'GET',
            url: 'https://api.openweathermap.org/data/2.5/weather?q=' + [city] +'&units=imperial&appid=' + [key]
        })
        .then(({data}) => {
            let weather = {
                temp:  (Math.floor(5/9*(data.main.temp-32))),
                location : data.name
            }
            console.log(weather);
           
            return res.status(200).json(weather)
        })
        .catch(err => {
            return next(err)
        })
    }
    static postGoogleLogin(req,res,next){ 
        let token =  req.body.id_token
        // console.log(token);  
        let randomedPass = Math.round(Math.random()*100000)+1000000
        // console.log(randomedPass);
        client.verifyIdToken({idToken:token})
            .then(payload=>{
                console.log(payload.payload);
                return User.findOrCreate({ 
                    defaults: {
                        fullname: payload.payload.fullname, 
                        username: payload.payload.given_name, 
                        email: payload.payload.email,
                        password: randomedPass+""
                    },
                    where: {
                        email:payload.payload.email
                    }
                })
            })
            .then(user=>{ 
                let userData = {id:user[0].id ,fullname: user[0].fullname,email:user[0].email}
                // console.log(userData);
                let token = signToken(userData)
                res.status(200).json({"access_token":token}) 
            })
            .catch(err=>{
                next(err) 
            }) 
    }
}

module.exports = ApiController