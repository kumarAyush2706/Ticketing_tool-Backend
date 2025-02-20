const express = require('express');
const router = express.Router();
const query = require("../controller/ticketing");
// const Query = require("./controller/Query")

router.post("/generateToken", query.generateToken );
router.post("/verify",query.verify);
router.get("/getQuery",query.getQuery)
router.get("/getDescriptions",query.getDescriptions)


module.exports = router;