const Axios = require('axios')

const query = 'Naruto'

Axios.get(`https://api.jikan.moe/v3/search/anime?q=${query}`)
    .then(({data})=>{
        console.log(data)
    })
    .catch(err=>{
        console.log(err)
    })