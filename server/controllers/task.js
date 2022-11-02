const { Tasks } = require("../models/")
const chalk = require("chalk");

class Controller {
  //? READ ALL TASKS
  // GET /tasks
  static async readTasks(req, res, next) {
    try {
      const UserId = +req.author.id;

      const tasks = await Tasks.findAll({
        // include : [ User ],
        where: { UserId },
      });

      if (!tasks) {
        throw { name: "DATA_NOT_FOUND" };
      }

      res.status(200).json({
        message: "SUCCESS READ TASKS DATA",
        tasks,
      });

      console.log(
        chalk.green("SUCCESS FROM CONTROLLER READ TASKS : GET /tasks")
      );
    } catch (error) {
      next(error);
      console.log(
        chalk.red("ERROR FROM CONTROLLER READ TASKS (GET /tasks) : "),
        error
      );
    }
  }

  //? ADD TASK
  // POST /tasks
  static async addTask(req, res, next) {
    try {
      const UserId = +req.author.id;
      const { name } = req.body;

      await Tasks.create({
        name: name,
        UserId: UserId,
      });

      res.status(201).json({
        message: "NEW TASK HAS BEEN ADDED",
      });

      console.log(chalk.green("SUCCESS FROM CONTROLLER ADD TASK : POST /task"));
    } catch (error) {
      next(error);
      console.log(
        chalk.red("ERROR FROM CONTROLLER ADD TASK (POST /task) : "),
        error
      );
    }
  }

  //? DELETE TASK
  // DELETE /tasks/:id
  static async deleteTask(req, res, next) {
    try {
      const id = +req.params.id;

      const findOne = await Tasks.findByPk(id);

      if (!findOne) {
        throw { name: "DATA_NOT_FOUND" };
      }

      await Tasks.destroy({
        where: { id },
      });

      res.status(200).json({
        message: `TASK : ${findOne.name} SUCCESS TO DELETE`,
      });

      console.log(
        chalk.green("SUCCESS FROM CONTROLLER DELETE TASK : DELETE /tasks/:id")
      );
    } catch (error) {
      next(error);
      console.log(
        chalk.red("ERROR FROM CONTROLLER DELETE TASK (DELETE /tasks/:id) : "),
        error
      );
    }
  }

  //? UPDATE TASK STATUS
  // PATCH /tasks/:id
  static async updateTaskStatus(req, res, next) {
    try {
      const id = req.params.id;
      const { status } = req.body;

      const findTask = await Tasks.findByPk(id);

      if (!findTask) {
        throw { name: "DATA_NOT_FOUND" };
      }

      const updatedTask = await Tasks.update(
        {
          status
        },
        {
          where: { id },
        },
      );

      res.status(201).json({
        statusCode: 201,
        message: `TASK STATUS HAS BEEN UPDATED`,
      });

      console.log(chalk.green("SUCCESS FROM CONTROLLER : PATCH /tasks/:id"));
    } catch (error) {
      console.log(
        chalk.red("ERROR FROM CONTROLLER PATCH /tasks/:id : "),
        error
      );
      next(error);
    }
  }
}

module.exports = Controller;
