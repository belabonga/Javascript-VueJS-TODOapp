const route = require("express").Router();
const { authentication } = require("../middlewares/authentication");
const { errorHelper } = require('../helpers/errors');
const TaskRoute = require('./task');
const SessionRoute = require('./session');


route.get("/", (req, res) => {
  res.send("Go! Go! Go!");
});

// SESSION ENDPOINTS (Login, Register, etc.)
route.use("/", SessionRoute);

// AUTH
// ROUTE UNDER THIS NEEDS AUTH
route.use(authentication);

// TASK ENDPOINTS (MAIN ROUTE)
route.use("/task", TaskRoute);

// USE ERROR HELPER
route.use(errorHelper)

module.exports = route