const db = require("../db/models");

const checkProfileComplete = (res, req, next) => {
  const email = req.req.user.emails[0].value;
  db.users.findOne({ where: { email } }).then((user) => {
    if (user.profile_updated === 1) {
      return next();
    } else {
      res.res.redirect("/updateprofile");
    }
  });
};

module.exports = checkProfileComplete;
