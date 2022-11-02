const { Task }                   = require('../models/task')
    , chalk                      = require('chalk');

class Controller {
    //? READ ALL TASKS
  // GET /tasks
  static async readTasks(req, res, next) {
    try {
      const UserId = +req.author.id

      const tasks = await Task.findAll({
        // include : [ User ],
        where : { UserId }
      });

      if (!tasks) {
        throw { name: "DATA_NOT_FOUND" };
      }

      res.status(200).json({
        message: "SUCCESS READ TASKS DATA",
        bookmarks,
      });

      console.log(
        chalk.green(
          "SUCCESS FROM CONTROLLER READ TASKS : GET /tasks"
        )
      );
    } catch (error) {
      next(error);
      console.log(
        chalk.red(
          "ERROR FROM CONTROLLER READ TASKS (GET /tasks) : "
        ),
        error
      );
    }
  }

  //? ADD TASK
  // POST /tasks
  static async addTask(req, res, next) {
    try {

      const UserId = +req.author.id
      const { name } = req.body;
      
      
      await Task.create({
        name: name,
        UserId: UserId,
      });

      res.status(201).json({
        message: "NEW TASK HAS BEEN ADDED",
      });

      console.log(
        chalk.green(
          "SUCCESS FROM CONTROLLER ADD TASK : POST /task"
        )
      );
    } catch (error) {
      next(error);
      console.log(
        chalk.red(
          "ERROR FROM CONTROLLER ADD TASK (POST /task) : "
        ),
        error
      );
    }
  }

  //? DELETE TASK
  // DELETE /tasks/:id
  static async deleteBookmarks(req, res, next) {
    try {
      const id = +req.params.id

      const findOne = await Task.findByPk(id, {
        include : [ User ]
      });

      if (!findOne) {
        throw { name : 'DATA_NOT_FOUND' }
      }

      await Task.destroy({
        where : { id }
      })

      res.status(200).json({
        message : `${findOne.task.name} success to delete`
      })

      console.log(
        chalk.green(
          "SUCCESS FROM CONTROLLER DELETE TASK : DELETE /tasks/:id"
        )
      );
    } catch (error) {
      next(error);
      console.log(
        chalk.red(
          "ERROR FROM CONTROLLER DELETE TASK (DELETE /tasks/:id) : "
        ),
        error
      );
    }
  }

}

module.exports = Controller;