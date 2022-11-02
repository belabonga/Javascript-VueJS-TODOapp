"use strict";
const { Model } = require("sequelize");
const { hashPass } = require("../helpers");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // USER & TODO LIST
      User.hasMany(models.TodoList, {
        foreignKey : 'UserId'
      })
    }
  }
  User.init(
    {
      email: {
        type: DataTypes.STRING,
        unique: {
          msg: "Email has already registered",
        },
        allowNull: false,
        validate: {
          notNull: {
            msg: "Email is Required",
          },
          notEmpty: {
            msg: "Email is Required",
          },
          isEmail: {
            msg: "Please enter email with right format",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Password is Required",
          },
          notNull: {
            msg: "Password is Required",
          },
          min: {
            args: [5],
            msg: "Minimum 5 characters required",
          },
        },
      },
    },
    {
      hooks: {
        beforeCreate(user) {
          const hashedPass = hashPass(user.password)
          user.password = hashedPass;
        },
      },
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
