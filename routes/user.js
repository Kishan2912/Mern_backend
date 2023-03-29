const router = require("express").Router();
const { register, login, getProfile, updateProfile }=require("../Controllers/user.js");
const { authenticateToken } =require("../middleware/auth");

// Register api
router.post("/register", register);

// login api
router.post("/login", login)

// profile details api
router.get("/profile", authenticateToken, getProfile)

// Edit profile api
router.post("/profile",authenticateToken, updateProfile)

module.exports =router;
