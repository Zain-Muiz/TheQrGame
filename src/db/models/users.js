"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  users.init(
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      ph_no: DataTypes.STRING,
      batch: DataTypes.STRING,
      profile_photo: DataTypes.STRING,
      score: DataTypes.FLOAT,
      profile_updated: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "users",
    }
  );
  return users;
};
