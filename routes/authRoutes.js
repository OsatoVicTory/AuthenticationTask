const express = require("express");
const router = express.Router();

const { loginUser } = require("../controller/loginController");
const { signupUser } = require("../controller/signupController");
const { authUser } = require("../controller/authController");
const { 
    checkUser,
    checkStaff,
    checkAdmin,
    checkManager
} = require("../controller/checker");

const { 
    showUser,
    showStaff,
    showAdmin,
    showManager
} = require("../controller/show");

const { getNewPassword } = require("../controller/newPassword");

//signup User
router.post("/signup", signupUser);

//loginUser
router.get("/login", loginUser);

//PROTECTED ROUTES
//users routes
router.get("/user", authUser, checkUser, showUser);

//staff routes
router.get("/staff", authUser, checkStaff, showStaff);

//admin routes
router.get("/admin", authUser, checkAdmin, showAdmin);

//users routes
router.get("/manager", authUser, checkManager, showManager);

//get new password for password recovery
router.put("/recovery", getNewPassword);

module.exports = router;