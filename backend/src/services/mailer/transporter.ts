import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  port: 465,
  host: process.env.MAIL_HOST,
  service: process.env.MAIL_SERVICE,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASSWORD,
    },
  secure: true,
});

export default transporter;