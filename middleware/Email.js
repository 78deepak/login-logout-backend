// const { transporter } = require('./Email.config');

// const SendVerificationCode = async (email, verificationCode) => {
//     try {
//         const response = await transporter.sendMail({
//             from: '"Diary App 👻" <dp787938@gmail.com>', // sender address
//             to: email, // list of receivers
//             subject: "Verify your Email", // Subject line
//             text: "Verify your Email", // plain text body
//             html: `<p>Your verification code is: <b>${verificationCode}</b></p>`, // HTML body with the code
//         });
//         console.log("Email sent successfully", response);
//     } catch (error) {
//         console.error('Failed to send email:', error);
//     }
// };

// // Export the function for use in other files
// module.exports = {
//     SendVerificationCode
// };




const { transporter } = require('./Email.config');

const SendVerificationCode = async (email, verificationCode) => {
    try {
        const response = await transporter.sendMail({
            from: '"Diary App 👻" <dp787938@gmail.com>', // sender address
            to: email, // list of receivers
            subject: "Verify your Email", // Subject line
            text: "Verify your Email", // plain text body
            html: `<p>Your verification code is: <b>${verificationCode}</b></p>`, // HTML body with the code
        });
        console.log("Email sent successfully", response);
    } catch (error) {
        console.error('Failed to send email:', error);
        throw new Error('Email sending failed'); // Throw an error for further handling
    }
};

// Export the function for use in other files
module.exports = SendVerificationCode; // Correctly export the functionx