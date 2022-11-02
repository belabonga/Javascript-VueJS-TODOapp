'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tasks extends Model {
    static associate(models) {
      // USER & TODO LIST
      Tasks.belongsTo(models.User, {
        foreignKey : 'UserId'
      })
    }
  }
  Tasks.init({
    name: {
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        notNull : {
          msg : "Name is Required"
        },
        notEmpty : {
          msg : "Name is Required"
        }
      }
    },
    status : {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue : 'on Hold'
    },
    UserId: {
      type : DataTypes.INTEGER,
      references : {
        model : 'Users',
        key : 'id'
      },
      onUpdate : 'cascade',
      onDelete : 'cascade'
    },
  }, {
    sequelize,
    modelName: 'Tasks',
  });
  return Tasks;
};