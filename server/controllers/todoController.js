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
		const addBody = {
			title: req.body.title,
			description: req.body.description,
			status: req.body.status || false,
			due_date: req.body.due_date,
			UserId: req.userData.id,
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
				res.status(404).json({ message: "Data Not Found" });
			} else {
				next({ name: "DataNotFound" });
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
