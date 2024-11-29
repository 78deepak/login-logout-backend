const nodemailer = require("nodemailer");
const dotenv = require("dotenv").config()

// Create a transporter using nodemailer

const pass = process.env.PASS
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // Use true for port 465, false for other ports
    auth: {
        user: "dp787938@gmail.com", // Your email address
        pass, // Your app-specific password
    },
});

// Function to send email
// const SendEmail = async () => {
//     try {
//         const info = await transporter.sendMail({
//             from: '"Diary App 👻" <dp787938@gmail.com>', // Sender address
//             to: "patidardeepak350@gmail.com", // Receiver address
//             subject: "Hello ✔", // Subject line
//             text: "Hello world with the new type", // Plain text body
//             html: "<b>Hello world?</b>", // HTML body
//         });
//         console.log("Email sent successfully:", info);
//     } catch (error) {
//         console.error("Failed to send email:", error);
//     }
// };

// Call the function to send the email
// SendEmail();

// Export transporter if needed in other files
module.exports = {
    transporter,
};
