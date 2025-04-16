const express = require("express");
const userController = require("../controllers/user.controller");
const router = express.Router();
const { body } = require("express-validator");

router.post("/register", [
  body("email").isEmail().withMessage("Invalid Email"),
  body("fullName.firstName")
    .isLength({ min: 3 })
    .withMessage("FirstName must be atleast 3 characters long"),
  body("password")
    .isLength({ min: 6 }) 
    .withMessage("Password must be 6 characters long"),
],userController.registerUser);

module.exports = router;
