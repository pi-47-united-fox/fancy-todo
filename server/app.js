"use strict";

require('dotenv').config()
const express = require("express");
const app = express();
const port = process.env.PORT;
const routes = require("./routes");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/", routes);

app.listen(port, () => {
	console.log(`Listening in port: ${port}`);
});
