const route = require("express").Router();
const { authentication } = require("../middlewares/authentication");
const { Error } = require("../helpers/errors");

// REDIRECT TO ROUTES FILES
const TaskRoute = require("./task");
const SessionRoute = require("./session");

route.get("/", (req, res) => {
  res.send("Go! Go! Go!");
});

// SESSION ENDPOINTS (Login, Register, etc.)
route.use("/", SessionRoute);

// AUTH
// ROUTE UNDER THIS NEEDS AUTH
route.use(authentication);

// TASK ENDPOINTS (MAIN ROUTE)
route.use("/tasks", TaskRoute);

// USE ERROR HELPER
route.use(Error);

module.exports = route;
