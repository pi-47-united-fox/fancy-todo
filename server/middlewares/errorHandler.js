const errorHandler = (err,req,res,next)=>{
    console.log("ERROR -----------------------------");
    console.log(err); 
    
    switch (err.name) {
        case 'Unauthorized':
            res.status(err.status).json({
                name: err.name,
                message: err.message
            })
            break; 
        case 'SequelizeValidationError':
            console.log(err)
            res.status(400).json({
                name: "Bad Request",
                message: err.errors[0].message
            })
            break; 
        case 'Bad Request':
            res.status(400).json({
                name: "Bad Request",
                message: err.message
            })
            break; 
        case 'Unauthenticated':
            res.status(400).json({
                name: "Unauthenticated",
                message: err.message
            })
            break; 
        case 'Forbidden':
            res.status(403).json({
                // name: "Unauthorized",
                message: err.message
            })
            break; 
        default:
            res.status(500).json({
                name: "Internal Server Error",
                message: err.message
            })
            break;
    }
}

module.exports = errorHandler