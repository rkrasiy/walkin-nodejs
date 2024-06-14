
import { Response, Request } from 'express';
import transporter from '../services/mailer/transporter';
import { sendMail } from '../services/mail.service';

export const sendEmail = async  (req:Request, res: Response) => {

  const { email } = req.body;

  try {
    // Send mail with defined transport object
    await sendMail(email, 'Confirm your appointment', '<h1>Confirm your appointment</h1>In 20 June 2024 at 13:00 AM. <a href="">Confirm</a>');

    res.status(200).send({ message: 'Email sent successfully' });
  } catch (error) {
      res.status(500).send({ message: 'Failed to send email' });
  }

 }