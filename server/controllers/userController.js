"use strict";

const { User } = require("../models");
const { checkPassword } = require("../helpers/bcrypt");
const { loginToken } = require("../helpers/jwt");
const getPicture = require("../helpers/defaultPicture");

class userController {
	static addUser(req, res, next) {
		const userBody = {
			email: req.body.email,
			password: req.body.password,
			first_name: req.body.first_name,
			last_name: req.body.last_name,
			gender: req.body.gender,
			profile_pic: getPicture(req.body.gender),
		};
		User.create(userBody)
			.then(({ id, email }) => {
				res.status(201).json({ id, email });
			})
			.catch((err) => {
				next(err);
			});
	}

	static login(req, res, next) {
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
				next(err);
			});
	}
}

module.exports = userController;
