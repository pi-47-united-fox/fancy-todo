"use strict";

const jwt = require("jsonwebtoken");

const loginToken = (obj) => {
	return jwt.sign(obj, process.env.JWT_SECRET);
};

const verifyToken = (token) => {
	return jwt.verify(token, process.env.JWT_SECRET);
};

module.exports = {
	loginToken,
	verifyToken,
};
