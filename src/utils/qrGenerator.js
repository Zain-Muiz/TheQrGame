const http = require("http");
const fs = require("fs");
var QRCode = require("qrcode");
const { v4: uuidv4 } = require("uuid");
const db = require("../db/models/index");
const Op = db.Sequelize.Op;

const qrGenerator = async (links) => {
  domain = "itshappening.athenatkmce.live/";
  console.log(links);
  links.forEach((linkstrand) => {
    const url = domain + linkstrand;
    console.log(linkstrand);
    image = QRCode.toFile(`./QRs/PreEvent29/type4/${linkstrand}.png`, url);
    db.qrLevels
      .findOne({
        where: {
          qr_level: -1,
        },
      })
      .then((qr_levels) => {
        db.qrCodes
          .create({
            id: uuidv4(),
            qr_link: linkstrand,
            qr_level_id: qr_levels.id,
          })
          .then((result) => console.log(result))
          .catch((err) => {
            console.log(err);
          });
      });
  });
};

module.exports = qrGenerator;
