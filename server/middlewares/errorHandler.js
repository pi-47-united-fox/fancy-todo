"user strict";

const errorHandler = (err, req, res, next) => {
	let statusCode = 500;
	let message = "Internal Server Error!";

	switch (err.name) {
		case "SequelizeValidationError":
		case "SequelizeUniqueConstraintError":
			statusCode = 400;
			message = [];
			err.errors.forEach((err) => {
				message.push(err.message);
			});
			break;
		case "JsonWebTokenError":
		case "TokenExpiredError":
			statusCode = 401;
			message = "You do not have access";
			break;
		case "DataNotFound":
			statusCode = 404;
			message = "Data Not Found";
			break;
	}

	res.status(statusCode).json({ message });
};

module.exports = errorHandler;
