"use strict";

const jwt = require("jsonwebtoken");

const loginToken = (obj) => {
	return jwt.sign(obj, "mySecret");
};

module.exports = loginToken;
