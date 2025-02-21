const express = require("express");
const router = express.Router();
const query = require("../controller/ticketing");
// const Query = require("./controller/Query")
const signUp = require("../controller/admin/signup");
const loginpage = require("../controller/admin/login");

router.post("/generateToken", query.generateToken);
router.post("/verify", query.verify);
router.get("/getQuery", query.getQuery);
router.get("/getDescriptions", query.getDescriptions);

//Admin login and sign Up
router.post("/signup", signUp);
router.post("/login", loginpage.loginpage);
router.get("/me", loginpage.me);
router.post("/logout", loginpage.logout);

module.exports = router;
