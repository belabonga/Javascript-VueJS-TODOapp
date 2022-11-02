const route = require("express").Router();
const ControllerSession = require("../controllers/session");

route.post("/login", ControllerSession.login);
route.post("/register", ControllerSession.register);

module.exports = route;
