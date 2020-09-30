function dateToEpoch(date){ 
    // console.log(date, "helper<<<<<<,,");
    // console.log(new Date(date).valueOf());
    return new Date(date).valueOf() 
}

module.exports = dateToEpoch