const express = require("express");
const app = express();
const router = express.Router();
const userController = require("../controllers/users.controllers");
const publicController = require("../controllers/public.controllers");
const passportAuth = require("../auth/passportAuth");
const checkProfileComplete = require("../auth/checkProfileComplete");

//For adding new qr
router.get("/signup", passportAuth, userController.createUser);
router.get("/home", publicController.homePage);
router.get("/register", publicController.homePage);
router.get("/", publicController.homePage);
router.get("/updateprofile", passportAuth, userController.updateUserInfoPage);
router.post("/updateprofile", passportAuth, userController.updateUserInfo);
// router.get("/:id", passportAuth, checkProfileComplete, userController.ScanQR);
router.get("/:id", publicController.homePage);

module.exports = router;
