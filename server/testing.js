const Axios = require('axios')



Axios.get(`https://pokeapi.co/api/v2/pokemon/charizard`)
    .then(result=>{
        console.log(result)
    })
    .catch(err=>{
        console.log(err)
    })