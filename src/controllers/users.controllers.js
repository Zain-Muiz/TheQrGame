const express = require("express");
const { ValidationErrorItem } = require("sequelize");
const app = express();
const db = require("../db/models");
const { v4: uuidv4 } = require("uuid");
const Op = db.Sequelize.Op;

//POST USERS

module.exports.createUser = async (req, res) => {
  const name = req.user.displayName;
  const email = req.user.emails[0].value;
  const profile_photo = req.user.photos[0].value;
  const score = 0;
  const profile_updated = 0;

  db.users
    .findOne({ where: { email } })
    .then((result) => {
      if (!result) {
        db.users
          .create({
            id: uuidv4(),
            name,
            email,
            profile_photo,
            score,
            profile_updated,
          })
          .then((result) => {
            res.redirect("/updateprofile");
          });
      } else {
        res.render("/dashboard");
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({
        message: err.message || "Error occurred while creating the User.",
      });
    });
};

// POST

module.exports.updateUserInfo = async (req, res) => {
  const { ph_no, branch, section, year } = req.body;
  const batch = branch + section + year;
  const email = req.user.emails[0].value;
  const profile_updated = 1;

  db.users
    .update(
      {
        ph_no,
        batch,
        profile_updated,
      },
      {
        where: { email },
        returning: true,
      }
    )
    .then((result) => {
      if (result[0] === 1) {
        const updateduser = result[1];
        res.render("/dashboard", { user: req.user, score: 0 });
      } else {
        res.status(404).send({
          message: `User with email=${req.user.email} not found.`,
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({
        message:
          err.message ||
          `Error occurred while updating User with email=${req.user.email} `,
      });
    });
};

// GET
module.exports.updateUserInfoPage = (req, res) => {
  res.render("updateProfile", { user: req.user });
};

module.exports.ScanQR = (req, res) => {
  const qr_link = req.params.id;
  const email = req.user.emails[0].value;
  db.qrCodes
    .findOne(
      { where: { qr_link } },
      {
        include: {
          model: db.qrLevels,
          attributes: ["qr_score"],
        },
      }
    )
    .then((result) => {
      console.log("1");
      if (!result) {
        res.render("/dashboard");
      } else {
        qr_id = result.id;
        db.users
          .findOne({ where: { email } })
          .then((user) => {
            console.log("user id : 2");
            if (!user) {
              res.render("home");
            } else {
              user_id = user.id;
              db.userQrs.findOne({ where: { user_id, qr_link } }).then((Qr) => {
                console.log("user qr 3");
                if (!Qr) {
                  db.userQrs
                    .create({
                      id: uuidv4(),
                      user_id,
                      qr_id,
                    })
                    .then(() => {
                      res.render("dashboard");
                    });
                } else {
                  res.render("dashboard");
                }
              });
            }
          })
          .catch((err) => {
            res.send("Error fetching user");
          });
      }
    });
};
