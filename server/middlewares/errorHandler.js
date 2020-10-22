const errorHandler = (err,req,res,next) => {
    console.log(err)

    switch(err.name) {
        case 'Unauthorized':
            res.status(401).json({
                name: 'Unauthorized',
                message: err.errors[0].message
            })
        break;
        case 'SequelizeValidationError':
            res.status(400).json({
                name: 'Bad Request',
                message: err.errors[0].message
            })
        break;
        case 'SequelizeUniqueConstraintError':
            res.status(400).json({
                name: 'Bad Request',
                message: err.errors[0].message
            })
        break;
        case 'SequelizeForeignKeyConstraintError': 
            res.status(400).json({
                name: 'Bad Request',
                message: err.errors[0].message
            })
        break;
        case 'JsonWebTokenError': 
            res.status(401).json({
                name: 'Unauthorized',
                message: err.errors[0].message
            })
        case 'TokenExpiredError': 
            res.status(401).json({
                name: 'Unauthorized',
                message: err.errors[0].message
            })
        break;
        default:
            status = 500
            res.status(status).json({
                name: err.name,
                message: err.message
            })
        break
    }
}

module.exports = errorHandler