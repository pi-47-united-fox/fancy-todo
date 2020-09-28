class Helper{
    static isFutureDate(date){
        let currentDate = new Date().now()
        console.log(currentDate)
        var today = new Date().now(),
        date = date.split("/")
        console.log(today)

        date = new Date(date[2], date[1]-1, date[0])
        console.log(date)
        return (today - date) < 0
    }
}

console.log(Helper.isFutureDate('28/09/2020'))


