var express = require("express");
const { createUser, getUser } = require("../controllers/user");
var router = express.Router();

router.post("/user/new", createUser);
router.get("/user/:id", getUser);

module.exports = router;
