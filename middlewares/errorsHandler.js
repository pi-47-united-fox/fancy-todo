const errorsHandler = (err, req, res, next) => {
    // console.log(err)

    if(err.name === "SequelizeValidationError") {
        res.status(400).json({
            message: err.errors.map(Element => {
                return Element.message
            })
        })

    } else {
        res.status(500).json({
            name: "Internal Server Error",
            message: "Something wrong, you know it is something! "
        })
    }

}

module.exports = errorsHandler