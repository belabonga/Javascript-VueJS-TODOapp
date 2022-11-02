const route = require("express").Router();
const ControllerTask = require("../controllers/task");

route.get('/', ControllerTask.readTasks);
route.post('/', ControllerTask.addTask);
route.delete('/:id', ControllerTask.deleteTask);
route.patch('/:id', ControllerTask.updateTaskStatus);

module.exports = route;
