const passportAuth = (res, req, next) => {
  if (req.req.isAuthenticated()) {
    return next();
  } else {
    res.res.redirect("/home");
  }
};

module.exports = passportAuth;
