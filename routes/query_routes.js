const express = require("express");
const router = express.Router();
const query = require("../controller/ticketing");
// const Query = require("./controller/Query")
const signUp = require("../controller/admin/signup");
const loginpage = require("../controller/admin/login");

const userReplyFetch = require("../controller/admin/fetchReply");

// reply to query
const queryController = require("../controller/admin/reply");

router.post("/generateToken", query.generateToken);
router.post("/verify", query.verify);
router.get("/getQuery", query.getQuery);
router.get("/getDescriptions", query.getDescriptions);
router.put("/updateStatus/:id", query.updateStatus);

//Admin login and sign Up
router.post("/signup", signUp);
router.post("/login", loginpage.loginpage);
router.get("/me", loginpage.me);
router.post("/logout", loginpage.logout);

//Admin reply
router.get("/getQuery/:queryId", queryController.getQueryById);
router.post("/reply", queryController.addReply);

//user reply fetch
router.get("/userReply", userReplyFetch.userReplyFetch);

module.exports = router;
