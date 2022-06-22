"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class qrCodes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      qrCodes.hasOne(models.qrLevels, {
        foreignKey: "id",
      });
    }
  }
  qrCodes.init(
    {
      qr_link: DataTypes.STRING,
      qr_level_id: DataTypes.UUID,
    },
    {
      sequelize,
      modelName: "qrCodes",
    }
  );
  return qrCodes;
};
