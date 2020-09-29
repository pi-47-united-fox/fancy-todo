"use strict";

const { User } = require("../models");
const { checkPassword } = require("../helpers/bcrypt");
const { loginToken } = require("../helpers/jwt");

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

	static login(req, res) {
		const userBody = {
			email: req.body.email,
			password: req.body.password,
		};

		User.findOne({ where: { email: userBody.email } })
			.then((data) => {
				if (data && checkPassword(userBody.password, data.password)) {
					const access_token = loginToken({ id: data.id, email: data.email });
					res.status(201).json({ access_token });
				} else {
					res.status(401).json({ message: "Invalid email or password" });
				}
			})
			.catch((err) => {
				res.status(500).json({ message: err });
			});
	}
}

module.exports = userController;
