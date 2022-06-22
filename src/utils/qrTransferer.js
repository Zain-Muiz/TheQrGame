const http = require("http");
const fs = require("fs");
var QRCode = require("qrcode");
const { v4: uuidv4 } = require("uuid");
const db = require("../db/models/index");
const Op = db.Sequelize.Op;

const qrTransferer = async (links) => {
  db.qrCodes
    .findAll({
      where: {},
    })
    .then((result) => console.log(result))
    .catch((err) => {
      console.log(err);
    });
};
