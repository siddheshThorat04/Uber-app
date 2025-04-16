const { validationResult } = require("express-validator");
const userService = require("../services/user.service");
const userModel = require("../models/user.model");
const BlacklistToken = require("../models/blacklistToken.model");
module.exports.registerUser = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { fullName, email, password } = req.body;

    userModel.findOne({ email }).then((user) => {
      if (user) {
        return res.status(400).json({ message: "User already exists" });
      }
    })
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
    res.cookie("token", token)
    res.status(201).json({ token, user });
  } catch (error) {}
};
module.exports.loginUser = async (req, res, next) => { 
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body; 

  const user = await userModel.findOne({ email }).select("+password");

  if (!user) {
    return res.status(401).json({ message: "Invalid email or password" });
  }
  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    return res.status(401).json({ message: "Invalid email or password" });
  }
  const token = user.generateAuthToken();
  res.cookie("token", token)
  res.status(200).json({ token, user });  



}
module.exports.getUserProfile = async (req, res, next) => {
  const user = req.user;
  res.status(200).json(user);
}

module.exports.logoutUser = async (req, res, next) => {

  const token =req.cookies.token || req.headers.authorization?.split(" ")[1];
  await BlacklistToken.create({ token });
  res.clearCookie("token");
  res.status(200).json({ message: "Logout successful" });
}