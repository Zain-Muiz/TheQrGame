const express = require("express");
const app = express();
const cors = require("cors");
const session = require("express-session");
const routes = require("./routes/routes");
const path = require("path");
const db = require("./db/models");

require("dotenv").config();

const host = process.env.HOST;
const port = process.env.PORT;
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set("view engine", "ejs");

//set ejs as view engine
app.set("views", path.join(__dirname, "../views"));
// middleware & static files
app.use(express.static(path.join(__dirname, "../public")));
//url parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: "SECRET",
  })
);

/* CORS */
const whitelist = [
  "http://localhost:3000",
  "http://btg.istetkmce.in",
  "https://btg.istetkmce.in",
];
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};
app.use(cors(corsOptions));

/* CORS END */
// app.listen(port, () => {
//   console.log(`Server running at http://${host}:${port}`);
// });


db.sequelize.sync().then(req =>{ 
    app.listen(3000 , ()=>{
        console.log("server running");
    })
});


/* PASSPORT */

const passport = require("passport");
const router = require("./routes/routes");
var userProfile;

app.use(passport.initialize());
app.use(passport.session());

app.set("view engine", "ejs");

app.get("/success", (req, res) => res.send(userProfile));
app.get("/error", (req, res) => res.send("error logging in"));

passport.serializeUser(function (user, cb) {
  cb(null, user);
});

passport.deserializeUser(function (obj, cb) {
  cb(null, obj);
});

/*  Google AUTH  */

const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/auth/google/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      userProfile = profile;
      return done(null, userProfile);
    }
  )
);

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/error" }),
  function (req, res) {
    // Successful authentication, redirect success.
    res.redirect("/signup");
  }
);

app.use("/", routes);
