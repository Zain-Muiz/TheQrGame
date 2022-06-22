const express = require("express");
const app = express();
const router = express.Router();
const userController = require("../controllers/users.controllers");
const publicController = require("../controllers/public.controllers");
const passportAuth = require("../auth/passportAuth");

//For adding new qr
router.get("/signup", passportAuth, userController.createUser);
// router.get("/home", publicController.homePage);
// router.get("/welcome", passportAuth, publicController.welcomePage);
router.get("/updateprofile", passportAuth, userController.updateUserInfoPage);
router.post("/updateprofile", passportAuth, userController.updateUserInfo);
router.get("/", passportAuth, userController.ScanQR);

module.exports = router;
