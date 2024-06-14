import nodemailer from 'nodemailer'

console.log(process.env.ST_EMAIL)
const transporter = nodemailer.createTransport({
  port: 465,
  host: "smtp.gmail.com",
    auth: {
      user: process.env.ST_EMAIL,
      pass: process.env.ST_EMAIL_PASSWORD,
    },
  secure: true,
});

export default transporter;