"use strict";

const { User } = require("../models");
const { checkPassword } = require("../helpers/bcrypt");

class userController {
	static addUser(req, res) {
		const userBody = {
			email: req.body.email,
			password: req.body.password,
			first_name: req.body.first_name,
			last_name: req.body.last_name,
		};
		User.create(userBody)
			.then(({ id, email }) => {
				res.status(201).json({ id, email });
			})
			.catch((err) => {
				if (err.name === "SequelizeValidationError" || "SequelizeUniqueConstraintError") {
					res.status(400).json(err.errors);
				} else {
					res.status(500).json({ message: err });
				}
			});
	}
}

module.exports = userController;
