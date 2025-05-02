const captainModel = require("../models/captain.model");
const bcrypt = require("bcrypt");
const captainService = require("../services/captain.service");
const { validationResult } = require("express-validator");

module.exports.registerCaptain = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {
      fullName,
      email,
      password,
      vehicle
    } = req.body;
    const isCaptainExisting= await captainModel.findOne({email});
    if(isCaptainExisting){
        return res.status(400).json({message:"Captain already exists"});
    }
    const hasshedPassword= await captainModel.hashPassword(password);
    const captain= await captainService.createCaptain({
        firstName:fullName.firstName,
        lastName:fullName.lastName,
        email,
        password:hasshedPassword,
        color:vehicle.color,
        plate:vehicle.plate,
        capacity: vehicle.capacity,
        vehicleType:vehicle.vehicleType
    })
    const token = captain.generateAuthToken();


    res.status(201).json({token,captain});
} catch (error) {
    
    res.status(400).json({message:error.message});
  }
};


module.exports.loginCaptain = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    const captain = await captainModel.findOne({ email });
    if (!captain) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    const isMatch = await captain.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    const token = captain.generateAuthToken();
    res.cookie("token", token)
    res.status(200).json({ token, captain });
  } catch (error) {
    res.status(400).json({ message: error.message }); 
  }

}