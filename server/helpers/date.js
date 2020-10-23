const todayDate = () => {
    const today = new Date()

    // return `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`
    return today.toString
}

// console.log(todayDate())

module.exports = todayDate