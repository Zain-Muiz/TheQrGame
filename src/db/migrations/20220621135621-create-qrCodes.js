"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("qrCodes", {
      id: {
        allowNull: false,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      qr_link: {
        type: Sequelize.STRING,
      },
      qr_level_id: {
        type: Sequelize.UUID,
        references: {
          model: {
            tableName: "qrLevels",
          },
          Key: "id",
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("qrCodes");
  },
};
