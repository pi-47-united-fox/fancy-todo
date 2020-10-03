"use strict";

const { User } = require("../models");
const { checkPassword } = require("../helpers/bcrypt");
const { loginToken } = require("../helpers/jwt");
const getPicture = require("../helpers/defaultPicture");
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(process.env.CLIENT_ID);

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
					res.status(201).json({
						access_token,
						userName: `${data.first_name} ${data.last_name}`,
						profile_pic: data.profile_pic,
					});
				} else {
					res.status(401).json({ message: "Invalid email or password" });
				}
			})
			.catch((err) => {
				next(err);
			});
	}

	static googleSign(req, res, next) {
		const token = req.body.token;
		let user = null;
		client
			.verifyIdToken({
				idToken: token,
				audience: process.env.CLIENT_ID,
			})
			.then((ticket) => {
				const payload = ticket.getPayload();
				user = {
					first_name: payload.given_name,
					last_name: payload.family_name,
					email: payload.email,
					password: process.env.DEFAULT_PASS,
					profile_pic: getPicture("other"),
				};
				return User.findOne({ where: { email: user.email } });
			})
			.then((data) => {
				return !data ? User.create(user) : data;
			})
			.then((data) => {
				const access_token = loginToken({ email: data.email, id: data.id });
				res.status(200).json({ access_token });
			})
			.catch((err) => {
				next(err);
			});
	}
}

module.exports = userController;
