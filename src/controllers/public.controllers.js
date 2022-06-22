const express = require("express");
const { ValidationErrorItem } = require("sequelize");
const app = express();
const db = require("../db/models");
const Op = db.Sequelize.Op;

//POST USERS

module.exports.homePage = async (req, res) => {
  res.render("home");
};
