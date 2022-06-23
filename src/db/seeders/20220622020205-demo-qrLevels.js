"use strict";

const { v4: uuidv4 } = require("uuid");

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("qrLevels", [
      {
        id: "0ebaa526-192d-4069-893e-e9914f03d39b",
        qr_level: -1,
        qr_score: -5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "1df34664-e9ef-44c9-a3bc-1c090782bbb6",
        qr_level: 1,
        qr_score: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "b89cef9a-8e91-4ac0-b239-827aa19fa575",
        qr_level: 2,
        qr_score: 25,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "2f3a8eb9-cfb9-4641-801e-e2d90a0c3843",
        qr_level: 3,
        qr_score: 75,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "15f0a7db-2ef8-4100-879d-f19f57e1ce3b",
        qr_level: 4,
        qr_score: 10,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "01ab7456-93b4-43f4-b2de-b30be16d44aa",
        qr_level: 0,
        qr_score: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("qrLevels", null, {});
  },
};
