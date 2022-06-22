"use strict";
const { Model } = require("sequelize");
const QrCodes = require("./QrCodes");
module.exports = (sequelize, DataTypes) => {
  class qrLevels extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  qrLevels.init(
    {
      qr_level: DataTypes.INTEGER,
      qr_score: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "qrLevels",
    }
  );
  return qrLevels;
};
