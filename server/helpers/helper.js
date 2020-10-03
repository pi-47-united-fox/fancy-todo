class Helper {
    static shrinkTitle(title) {
        if(title.length < 45) {
            return title
        } else {
            return title.substring(0, 44) + "..."
        }
    }

    static setDueDate(date, days) {
        let result = new Date(date)
        result.setDate(result.getDate() + days)
        return result
    }
}

module.exports = Helper

// let data = new Date()
// console.log(Helper.setDueDate(data, 3))