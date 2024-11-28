const cron = require('node-cron');
const SendVerificationCode = require('../middleware/Email.js'); // Ensure correct import
// const SendVerificationCode = require('../middleware/Email.js');
const bcrypt = require('bcrypt');
// const UserModel = require('../models/User');
const UserModel = require('../models/User');
const jwt = require('jsonwebtoken');

const dotenv = require("dotenv").config()
// const signup = async (req, res) => {
//   try {
//     const { name, email, password} = req.body;
//     const user = await UserModel.findOne({ email });
//     if (user) {
//       return res.status(400).json({
//         message: "User already exists, you can login",
//         success: false,
//       });
//     }
//     const verificationcode = Math.floor(100000 + Math.random() * 900000).toString();

//     const newUser = new UserModel({ name, email, password, verificationcode });
//     newUser.password = await bcrypt.hash(password, 10);
//     await newUser.save();
   
//     res.status(201).json({
//       message: "User created successfully",
//       success: true,
//     });
//     SendVerificationCode(user.email,verificationcode);
//   } catch (error) {
//     res.status(500).json({
//       message: "Internal Server Error",
//       success: false,
//     });
//   }
// };




//  by black box Ai 1st is my code

const signup = async (req, res) => {
  try {
      const { name, email, password } = req.body;

      // Check if the user already exists
      const user = await UserModel.findOne({ email });
      if (user) {
          return res.status(400).json({
              message: "User  already exists, you can login",
              success: false,
          });
      }

      // Generate verification code
      const verificationcode = Math.floor(100000 + Math.random() * 900000).toString();

      // Create a new user
      const newUser  = new UserModel({ name, email, password, verificationcode });
      newUser.password = await bcrypt.hash(password, 10);
      await newUser.save();

      // Send the success response
      res.status(201).json({
          message: "User  created successfully. Verification email sent.",
          success: true,
      });

      // Send the verification email (does not block the response)
      try {
          await SendVerificationCode(email, verificationcode);
          console.log("Verification email sent successfully");
      } catch (emailError) {
          console.error("Failed to send verification email:", emailError);
          // Log the error but do not send another response
      }
  } catch (error) {
      console.error("Error in signup:", error);
      if (!res.headersSent) {
          res.status(500).json({
              message: "Internal Server Error",
              success: false,
          });
      }
  }
};

const VerfiyEmail = async(req,res)=>{
    try {
        const {code} = req.body  
        const user = await UserModel.findOne({
            verificationcode:code
        })
        if(!user){
            return res.status(400).json({success:false, message:"Invalid or Expired Code"})
        }
        user.isverified = true,
        user.verificationcode = undefined
        await user.save()
        return res.status(200).json({success:true, message:"Email Verifed Successfully"})
    } catch (error) {
        console.log(error)
        return res.status(500).json({success:false,message:"internal server error"})        
    }
}



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

    if (!user.isverified) {
        return res.status(403).json({
            message: "Please verify your email to continue and try after 2 minutes.",
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


// Cleanup job to delete unverified users older than 2 minutes
cron.schedule('*/2 * * * *', async () => {
    console.log("Running cleanup job for unverified users...");
    const now = new Date();
    const twoMinutesAgo = new Date(now - 2 * 60 * 1000);

    try {
        const result = await UserModel.deleteMany({
            isverified: false,
            createdAt: { $lt: twoMinutesAgo } // Only delete users created more than 2 minutes ago
        });

        if (result.deletedCount > 0) {
            console.log(`Deleted ${result.deletedCount} unverified users.`);
        }
    } catch (error) {
        console.error("Error during cleanup:", error);
    }
});


module.exports = {
  signup,
  login,
  VerfiyEmail
};





