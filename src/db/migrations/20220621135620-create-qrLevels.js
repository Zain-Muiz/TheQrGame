"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("qrLevels", {
      id: {
        allowNull: false,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      qr_level: {
        type: Sequelize.INTEGER,
      },
      qr_score: {
        type: Sequelize.INTEGER,
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
    await queryInterface.dropTable("qrLevels");
  },
};
