const express = require("express");
const { ValidationErrorItem } = require("sequelize");
const app = express();
const db = require("../db/models");
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
  const { ph_no, batch } = req.body;
  const email = req.user.email;
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
        res.redirect("/welcome");
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
  res.send(req.user);
};

module.exports.ScanQR = (req, res) => {
  res.send("Hello");
};
