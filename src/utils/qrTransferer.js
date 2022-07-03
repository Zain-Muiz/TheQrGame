const http = require("http");
const fs = require("fs");
const db = require("../db/models/index");
const Op = db.Sequelize.Op;

const qrTransferer = async (res) => {
  db.qrCodes
    .findAll({ attributes: { exclude: ["createdAt", "updatedAt"] }, raw: true })
    .then((result) => {
      result1 = result.slice(1, 74);
      result2 = result.slice(74);
      console.log(result1);
      console.log(result2);
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = qrTransferer;
