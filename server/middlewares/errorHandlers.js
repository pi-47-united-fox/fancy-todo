module.exports = (err, req, res, next) => {
    // console.log (">>>>", err)
    // res.json(err)

    // ! Validate if email is already used
    if (err.name == "SequelizeUniqueConstraintError" && err.errors[0].path == 'email') {
        res.status(400).json({
            message: 'Email already registered'
        })
    } // ! wrong email / password
    else if (err.name == 'invalid email pw input') {
        res.status(400).json({
            message: 'Invalid Email or Password'
        })
    } // ! massage auto from validate msg
    else if (err.name == 'SequelizeValidationError') {
        return res.status(400).json({
            message: err.errors[0].message
        })
    } // ! Every data if not found
    else if (err.name == 'not found') {
        return res.status(404).json({
            message: 'Not Found!'
        })
    } // ! JWT Problem
    else if (err.name == 'JsonWebTokenError') {
        return res.status(500).json({
            message: 'You dont have acces to this operation'
        })
    } // ! Default
    else {
        res.status(500).json(err)
        // res.status(500).json({
        //     message: 'Internal Server Error',
        //     type: 'masuk default nih'
        // })
    }
}