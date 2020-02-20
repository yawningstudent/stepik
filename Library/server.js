const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
//const fs = require("fs");

app.use(express.static(__dirname + "/assets"));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
const routes = require("./routes");
app.use("/", routes);
app.set("view engine", "pug");
app.listen(8081);