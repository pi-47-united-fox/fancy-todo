"use strict";

const routes = require("express").Router();

// test routes
routes.get("/", (req, res) => {
	res.send("Hello World");
});

module.exports = routes;
