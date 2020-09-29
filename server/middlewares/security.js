"use strict";

const { verifyToken } = require("../helpers/jwt");
const { User, Todo } = require("../models");

const authentication = (req, res, next) => {
	const { access_token } = req.headers;
	if (access_token) {
		req.userData = verifyToken(access_token);
		User.findByPk(req.userData.id)
			.then((data) => {
				if (!data) {
					res.status(404).json({ message: "Data Not Found" });
				} else {
					next();
				}
			})
			.catch((err) => {
				res.status(500).json({ message: err });
			});
	} else {
		res.status(401).json({ message: "You do not have access" });
	}
};

const authorization = (req, res, next) => {
	Todo.findByPk(req.params.id)
		.then((data) => {
			if (!data) {
				res.status(404).json({ message: "Data Not Found" });
			} else if (data.UserId !== req.userData.id) {
				res.status(401).json({ message: "You do not have access" });
			} else {
				next();
			}
		})
		.catch((err) => {
			res.status(500).json({ message: err });
		});
};

module.exports = {
	authentication,
	authorization,
};
