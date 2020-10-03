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

    function getWeather(obj){  
        // let date = new Date().valueOf()
        // weatherApi.get(`onecall?dt=${date}`) 
        //     .then(result=>{ 
        //         let dataDaily =result.data.daily  
        //         dataDaily.forEach(element => {  
        //             // console.log("dt : ",element.weather," >> \n",element.dt, new Date(element.dt*1000));
        //             obj.forEach(ele => { 
        //                 dateEpoch = ele.epoch+39600000
        //                 console.log(dateEpoch,"<",new Date(dateEpoch));  
        //                 if(dateEpoch === element.dt*1000){ 
        //                     console.log(dateEpoch);
        //                     // console.log("dt : ",element.weather," >> \n",element.dt, new Date(element.dt*1000));
        //                 } 
        //             });  
        //         });
        //     })
        //     .catch(err=>{
        //         console.log(err);
        //     })
        // console.log(1601697600,"<",new Date(1601697600*1000));
        // console.log("weather date:",dateEpoch," >> ",new Date(dateEpoch)); //checkdate
        // let date = new Date().valueOf()
    } 

module.exports = getWeather