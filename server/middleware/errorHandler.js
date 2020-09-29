const errorHandler = (err, req, res, next) => {
    console.log(err)

    switch (err.name) {
        case 'Unautrhorized':
            statusCode = 401
            res.status(401).json({
                name: 'Unatuthorized',
                message: 'invalid API key'
            })
            break;

        case "SequelizeDatabaseError":
            statusCode = 400
            if (err.parent.code === '23502') {
                statusCode = 400
                message = err.errors[0].message
            }
            break;

        case "SequelizeUniqueConstraintError":
            statusCode = 400
            message = `${err.errors[0].value} value already exists`
            break;

        case 'sequelizeValidationError':
            res.status(400).json({
                name: 'Bad request',
                message: {
                    msg: err.message[0]
                }
            })
            break;

        case 'JsonWebTokenError':
            statusCode = 401
            res.status(401).json({
                name: 'JsonWebTokenError',
                message: "invalid signature"
            })
            break;

        default:
            res.status(500).json({
                name: err.name,
                message: err.message
            })
            break;

    }
}

module.exports = errorHandler