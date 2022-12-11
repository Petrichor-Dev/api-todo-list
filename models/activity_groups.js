'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class activity_groups extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  activity_groups.init({
    email: DataTypes.STRING,
    title: DataTypes.STRING,
    deleted_at: DataTypes.DATE,
    is_deleted: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'activity_groups',
  });
  return activity_groups;
};
