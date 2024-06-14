
import { Response, Request } from 'express';
import transporter from '../mailer/transporter';

export const sendEmail = async  (req:Request, res: Response) => {

  const { email } = req.body;

  transporter.sendMail(
    {
      from: process.env.ST_EMAIL,
      to: email,
      subject: 'User confirmation',
      text: 'Your confirmation code is: 6 1 2 5 6 1'
    }, (error) => {
      if (error) {
        res.status(400).json({error: error})
      } else {
        res.status(200).json({message: 'Successfule'})
      }
    }
  )
}