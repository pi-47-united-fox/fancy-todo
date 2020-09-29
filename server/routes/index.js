"use strict";

const routes = require("express").Router();
const todoController = require("../controllers/todoController");
const userContoller = require("../controllers/userController");
const { authentication, authorization } = require("../middlewares/security");

// test routes
routes.get("/", (req, res) => {
	res.send("Hello World");
});

// user routes
routes.post("/register", userContoller.addUser);
routes.post("/login", userContoller.login);

// authentication setelah login
routes.use(authentication);

// to do routes
routes.get("/todos", todoController.findAllTodo);
routes.get("/todos/:id", authorization, todoController.findTodo);

routes.post("/todos", todoController.addTodo);

routes.put("/todos/:id", authorization, todoController.editTodoPUT);
routes.patch("/todos/:id", authorization, todoController.editTodoPATCH);

routes.delete("/todos/:id", authorization, todoController.deleteTodo);

module.exports = routes;
