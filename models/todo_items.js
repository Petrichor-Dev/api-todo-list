'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class todo_items extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  todo_items.init({
    activity_group_id: DataTypes.INTEGER,
    title: DataTypes.STRING,
    is_active: DataTypes.BOOLEAN,
    priority: DataTypes.STRING,
    deleted_at: DataTypes.DATE,
    is_deleted: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'todo_items',
  });
  return todo_items;
};
