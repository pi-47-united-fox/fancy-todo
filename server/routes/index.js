"use strict";

const routes = require("express").Router();
const todoController = require("../controllers/todoController");

// test routes
routes.get("/", (req, res) => {
	res.send("Hello World");
});

// real routes
routes.get("/todos", todoController.findAllTodo);
routes.get("/todos/:id", todoController.findTodo);

routes.post("/todos", todoController.addTodo);

routes.put("/todos/:id", todoController.editTodoPUT);
routes.patch("/todos/:id", todoController.editTodoPATCH);

routes.delete("/todos/:id", todoController.deleteTodo);

module.exports = routes;
