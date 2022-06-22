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
        res.render("dashboard", { direct: true, name, score, qr_score: 0 });
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
        res.render("dashboard", {
          direct: true,
          name: updateduser.name,
          score: updateduser.score,
          qr_score: 0,
        });
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
    .findOne({ where: { qr_link } })
    .then(async (result) => {
      if (!result) {
        score = await getScore(req.user.emails[0].value);
        res.render("dashboard", {
          direct: true,
          name: req.user.name,
          score,
          qr_score: 0,
        });
      } else {
        const qr_level = result.qr_level_id;
        db.qrLevels.findOne({ where: { id: qr_level } }).then((qrLevel) => {
          console.log("score" + qrLevel.qr_score);
          qr_id = result.id;
          qr_score = parseInt(qrLevel.qr_score);
          db.users
            .findOne({ where: { email } })
            .then((user) => {
              console.log("user id : 2");
              if (!user) {
                res.render("home");
              } else {
                user_id = user.id;
                user_score = parseInt(user.score);
                db.userQrs
                  .findOne({ where: { user_id, qr_id } })
                  .then(async (Qr) => {
                    console.log("user qr 3");
                    if (!Qr) {
                      db.userQrs
                        .create({
                          id: uuidv4(),
                          user_id,
                          qr_id,
                        })
                        .then(() => {
                          new_score = parseInt(user_score) + parseInt(qr_score);
                          db.users
                            .update({ score: new_score }, { where: { email } })
                            .then(() => {
                              res.render("dashboard", {
                                direct: false,
                                qr_score,
                                score: new_score,
                                name: req.user.name,
                              });
                            })
                            .catch((err) => {
                              console.log(err);
                            });
                        });
                    } else {
                      score = await getScore(req.user.emails[0].value);
                      res.render("dashboard", {
                        direct: true,
                        name: req.user.name,
                        score,
                        qr_score: 0,
                      });
                    }
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              }
            })
            .catch((err) => {
              res.send("Error fetching user");
            });
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

const getScore = (email) => {
  db.users
    .findOne({ where: { email } })
    .then((user) => {
      return user.score;
    })
    .catch((err) => {
      console.log(err);
    });
};
