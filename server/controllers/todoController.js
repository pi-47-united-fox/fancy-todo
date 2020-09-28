"use strict";

const { Todo } = require("../models");

class todoController {
	static findAllTodo(req, res) {
		Todo.findAll()
			.then((data) => {
				res.status(200).json(data);
			})
			.catch((err) => {
				res.status(500).json({ message: err });
			});
	}

	static findTodo(req, res) {
		Todo.findByPk(+req.params.id)
			.then((data) => {
				if (data) {
					res.status(200).json(data);
				} else {
					res.status(404).json({ message: "Not Found" });
				}
			})
			.catch((err) => {
				res.status(500).json({ message: err });
			});
	}

	static addTodo(req, res) {
		const addBody = {
			title: req.body.title,
			description: req.body.description,
			status: req.body.status || false,
			due_date: req.body.due_date,
		};

		Todo.create(addBody)
			.then((data) => {
				res.status(201).json(data);
			})
			.catch((err) => {
				if (err.name === "SequelizeValidationError") {
					res.status(400).json(err.errors);
				} else {
					res.status(500).json({ message: "Internal Server Error" });
				}
			});
	}

	static async editTodoPUT(req, res) {
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
				res.status(404).json({ message: "Not Found" });
			} else {
				res.status(200).json(await Todo.findByPk(+req.params.id));
			}
		} catch (err) {
			if (err.name === "SequelizeValidationError") {
				res.status(400).json(err.errors);
			} else {
				res.status(500).json({ message: err });
			}
		}
	}

	static async editTodoPATCH(req, res) {
		try {
			const editBody = {
				status: req.body.status,
			};

			const isUpdateSuccess = await Todo.update(editBody, {
				where: { id: +req.params.id },
			});

			if (!isUpdateSuccess[0]) {
				res.status(404).json({ message: "Not Found" });
			} else {
				res.status(200).json(await Todo.findByPk(+req.params.id));
			}
		} catch (err) {
			if (err.name === "SequelizeValidationError") {
				res.status(400).json(err.errors);
			} else {
				res.status(500).json({ message: err });
			}
		}
	}

	static deleteTodo(req, res) {
		Todo.destroy({
			where: { id: +req.params.id },
		})
			.then((data) => {
				if (data) {
					res.status(200).json({ message: "todo success to delete" });
				} else {
					res.status(404).json({ message: "Not Found" });
				}
			})
			.catch((err) => {
				res.status(500).json({ message: err });
			});
	}
}

module.exports = todoController;
