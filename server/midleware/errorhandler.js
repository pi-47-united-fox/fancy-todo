const errorHandler = (err, req, res, next) => {
    let statusCode = 500
    let errors = []
    if (err.name === "SequelizeValidationError") {
        err.errors.map(el => {
            errors.push(el.message)
        })
        statusCode = 400
    } else if (err.name === "JsonWebTokenError") {
        errors.push(err.message)
        statusCode = 400
    } else {
        errors.push(err.msg || "internal server erros")
        statusCode = err.statusCode || 500
    }

    res.status(statusCode).json({ errors: errors })
    // res.status(statusCode).json(err)
}

module.exports = { errorHandler }
