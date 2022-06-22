"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class userQrs extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  userQrs.init(
    {
      user_id: DataTypes.UUID,
      qr_id: DataTypes.UUID,
    },
    {
      sequelize,
      modelName: "userQrs",
    }
  );
  return userQrs;
};
