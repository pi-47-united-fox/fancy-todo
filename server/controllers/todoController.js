"use strict";

const { Todo } = require("../models");

class todoController {
	static findAllTodo(req, res, next) {
		Todo.findAll({ where: { UserId: req.userData.id } })
			.then((data) => {
				res.status(200).json(data);
			})
			.catch((err) => {
				next(err);
			});
	}

	static findTodo(req, res, next) {
		Todo.findByPk(+req.params.id)
			.then((data) => {
				if (data) {
					res.status(200).json(data);
				} else {
					next({ name: "DataNotFound" });
				}
			})
			.catch((err) => {
				next(err);
			});
	}

	static addTodo(req, res, next) {
		console.log(req.body)
		const addBody = {
			title: req.body.title,
			description: req.body.description,
			status: req.body.status || false,
			due_date: req.body.due_date,
			UserId: req.userData.id,
			img_url: req.body.img_url || "https://avatars.dicebear.com/api/jdenticon/asfv231ra.svg",
			score: req.body.score || 0.01,
		};

		Todo.create(addBody)
			.then((data) => {
				res.status(201).json(data);
			})
			.catch((err) => {
				next(err);
			});
	}

	static async editTodoPUT(req, res, next) {
		try {
			const editBody = {
				title: req.body.title,
				description: req.body.description,
				status: req.body.status,
				due_date: req.body.due_date,
				img_url:
					req.body.img_url || "https://avatars.dicebear.com/api/jdenticon/asfv231ra.svg",
				score: req.body.score || 0,
			};

			const isUpdateSuccess = await Todo.update(editBody, {
				where: { id: +req.params.id },
			});

			if (!isUpdateSuccess[0]) {
				next({ name: "DataNotFound" });
			} else {
				res.status(200).json(await Todo.findByPk(+req.params.id));
			}
		} catch (err) {
			next(err);
		}
	}

	static async editTodoPATCH(req, res, next) {
		try {
			const editBody = {
				status: req.body.status,
			};

			const isUpdateSuccess = await Todo.update(editBody, {
				where: { id: +req.params.id },
			});

			if (!isUpdateSuccess[0]) {
				next({ name: "DataNotFound" });
			} else {
				res.status(200).json(await Todo.findByPk(+req.params.id));
			}
		} catch (err) {
			next(err);
		}
	}

	static deleteTodo(req, res, next) {
		Todo.destroy({
			where: { id: +req.params.id },
		})
			.then((data) => {
				if (data) {
					res.status(200).json({ message: "todo success to delete" });
				} else {
					next({ name: "DataNotFound" });
				}
			})
			.catch((err) => {
				next(err);
			});
	}
}

module.exports = todoController;
