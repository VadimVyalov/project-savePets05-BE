const nodemailer = require("nodemailer");
require("dotenv").config();

const sendEmail = async (email, token) => {
  const { GMAIL_USER, GMAIL_API_KEY, SERVER_URL } = process.env;

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: GMAIL_USER,
        pass: GMAIL_API_KEY,
      },
    });

    const info = await transporter.sendMail({
      from: GMAIL_USER,
      to: email,
      subject: "VERIFY EMAIL",
      text: "Please confirm your email",
      html: `<a href="${SERVER_URL}/users/verify/${token}">Confirm your email</a>`,
    });

    return info;
  } catch (error) {
    // console.log(error);
    throw appError(401, "Email send error");
  }
};

module.exports = { sendEmail };
