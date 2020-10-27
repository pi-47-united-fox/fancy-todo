const errorHandler = (err, req, res, next) => {
    console.log(err, "From errorHandler")
    switch(err.name){
        case 'Unauthorized':
            res.status(401).json({
                name: 'Unauthorized',
                message: err.message
            })
            break
        case 'SequelizeValidationError':
            // console.log(err.message, 'from switch err handler')
            res.status(400).json({
                name: 'Bad Request',
                message: err.message
            })
            break
        case 'Forbidden':
            res.status(403).json({
                name: 'Forbidden',
                message: "You do not have access!"
            })
            break
        case 'Not Found':
            res.status(404).json({
                name: 'Not found',
                message: err.message
            })
            break
        default:
            status = 500
            res.status(status).json({
                name: "Internal Server Error",
                message: err.message
            })
            break
    }
}

// import to controller
module.exports = errorHandler