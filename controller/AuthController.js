const bcrypt = require('bcrypt');
const UserModel = require('../models/User');
const jwt = require('jsonwebtoken');
const dotenv = require("dotenv").config()

const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (user) {
      return res.status(400).json({
        message: "User already exists, you can login",
        success: false,
      });
    }
    const newUser = new UserModel({ name, email, password });
    newUser.password = await bcrypt.hash(password, 10);
    await newUser.save();
    res.status(201).json({
      message: "User created successfully",
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};
const login = async (req, res) => {
  try {
    const {email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "enter valid username or password",
        success: false,
      });
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch){
        return res.status(403)
        .json({message:"enter valid username password", success:false});
    }

    const jwtToken = jwt.sign(
        {email:user.email,_id: user._id},
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
    )

    res.status(200)
    .json({
        message:"Login Success",
        success:true,
        jwtToken,
        email,
        name: user.name
    })
} catch (error) {
    res.status(500)
    .json({
        message:"Internal Server error find ",
        success:false
})
}
};

module.exports = {
  signup,
  login
};
