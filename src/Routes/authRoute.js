const express = require("express");
const authMiddleware = require("../Middleware/authMiddleware");
const authController  =  require("../Controllers/auth")
const router = express.Router();

router.post("/signup",  authController.signup);
router.post("/login", authController.login);

module.exports = router;