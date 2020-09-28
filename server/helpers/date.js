const todayDate = () => {
    const today = new Date()

    return `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`
}


module.exports = todayDate