import nodemailer from 'nodemailer';


export const sendMail = async (to: string, subject: string, html: string) => {
  
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

  const mailOptions = {
      from: process.env.MAIL_USER,
      to: to,
      subject: subject,
      html: html
  };

  console.log('Sending email to ', to);
  
  await transporter.sendMail(mailOptions)
  .catch(error => {
    console.error(error);
  });

}