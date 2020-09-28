"use strict";

const routes = require("express").Router();
const todoController = require("../controllers/todoController");
const userContoller = require("../controllers/userController");

// test routes
routes.get("/", (req, res) => {
	res.send("Hello World");
});

// to do routes
routes.get("/todos", todoController.findAllTodo);
routes.get("/todos/:id", todoController.findTodo);

routes.post("/todos", todoController.addTodo);

routes.put("/todos/:id", todoController.editTodoPUT);
routes.patch("/todos/:id", todoController.editTodoPATCH);

routes.delete("/todos/:id", todoController.deleteTodo);

// user routes
routes.post("/register", userContoller.addUser)

module.exports = routes;
