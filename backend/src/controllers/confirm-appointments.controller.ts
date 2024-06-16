
import { Response, Request } from 'express';
import quotesModel from '../models/quotes.model';

export const confirmAppointment = async  (req:Request, res: Response) => {

  const { token } = req.query;

  try {
    const appointment = await quotesModel.findOne({ confirmationToken: token });

    if (!appointment) {
      return res.status(400).send('Invalid or expired confirmation token.');
    }

    appointment.confirmed = true;
    await appointment.save();

    res.status(200).send('Appointment confirmed successfully.');
  } catch (err) {
    const error = err as Error;
    res.status(500).send('Error: ' + error.message);
  }
 }