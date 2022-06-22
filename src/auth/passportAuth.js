const passportAuth = (res, req, next) => {
  console.log(req.req.isAuthenticated());
  if (req.req.isAuthenticated()) {
    return next();
  } else {
    res.res.redirect("/home");
  }
};

module.exports = passportAuth;
