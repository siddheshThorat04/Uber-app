const { validationResult } = require("express-validator");
const userService = require("../services/user.service");
const userModel = require("../models/user.model");
module.exports.registerUser = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { fullName, email, password } = req.body;

    const hashedPassword = await userModel.hashPassword(password);
    console.log(hashedPassword);
    const user = await userService.createUser({
      firstName: fullName.firstName,
      lastName: fullName.lastName,
      email,
      password: hashedPassword,
    });
    console.log(user);
    const token = user.generateAuthToken();
    res.status(201).json({ token, user });
  } catch (error) {}
};
