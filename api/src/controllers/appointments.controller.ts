
import { Response, Request } from 'express';
import mongoose from 'mongoose';

import quotesModel from '../models/quotes.model';
import userModel from '../models/user.model';
import { sendMail } from '../services/mail.service';
import { generateConfirmationToken } from '../helpers/utils';
import generateAppointmentJWT from '../helpers/generate-appointment-jwt';

const defaultLimit = 20;

export const getAppointments = async (req:Request, res: Response) => {
  const limit = Number(req.query.limit);
  const offset = Number(req.query.offset);

  const _limit = isNaN(limit) ? defaultLimit : limit;
  const _offset = isNaN(offset) ? 0 : offset;
  
  const current = new Date();
  current.setUTCHours(0, 0, 0, 0);

  const query = {
    start: {
      $gte: current,
    },
  }

  if(req.query.id){
    Object.assign(query, {user: req.query.id})
  }

  const appointments = await quotesModel.find(query);

  const data = appointments.map(appointment => {return {start: appointment.start, end: appointment.end}})

  res.json(data);
}

export const newAppointment = async (req:Request, res: Response) => {

  try{
    const { service, user, fullName, email, start, end } = req.body;
 
    // Generate confirmation token
    const token = generateConfirmationToken();
    const dateStart = new Date(start);
    const dateEnd = new Date(end);
    
    const newQuote = new quotesModel({ 
      service, 
      user: user.id, 
      start: dateStart.toISOString(), 
      end: dateEnd.toISOString(), 
      created_on: (new Date()).toISOString(),
      confirmationToken: token
    });
  
    await newQuote.save();

    // Send confirmation email
    sendConfirmationEmail({
      email,
      date: dateStart,
      fullName,
      token
    });
    const { confirmationToken, ...quote} = newQuote;
    res.status(200).json(quote);
  }catch (err) {
    res.status(500).send('Error: ' + err);
  }
}

export const userChecking = async (req:Request, res: Response) => {
  try{
    const { service, fullName, email, phone, receiveNotification } = req.body;

    let user = await userModel.findOne({email: email });

    //Check if user exist
    if(user){
      const current = new Date();
      current.setUTCHours(0, 0, 0, 0);
  
      //Check if user has any future appointments
      const userQuotes = await quotesModel.find({
        service,
        start: {
          $gte: current,
        },
      });
  
      //Won't be allowed to make new appointments if there is already one.
      if(userQuotes.length > 0){
        res.status(200).json({appointments: userQuotes});
      }

    }else{
      user = new userModel({ fullName, email, phone, created_on: (new Date()).toISOString(), notifications: receiveNotification });
      await user.save();
      console.log('New user has been created.');
    }

    res.status(200).json({uid: user._id});

  }catch (err) {
    const error = err as Error;
    if (error instanceof mongoose.Error.ValidationError) {
      res.status(400).json({ message: 'Validation error', errors: error.errors });
    } else if (error instanceof mongoose.Error.CastError) {
      res.status(400).json({ message: 'Invalid ID format', error: error.message });
    } else if (error instanceof mongoose.mongo.MongoServerError) {
      res.status(409).json({ message: 'Duplicate key error', error: error.keyValue });
    } else {
      res.status(500).json({ message: error.message });
    }  
  }
}

async function sendConfirmationEmail({email, token, fullName, date}: {email: string, token: string, fullName: string, date: Date}){
  const confirmationUrl = `http://localhost/api/confirm-appointment?token=${token}`;

  const timeFormat: Intl.DateTimeFormatOptions = { 
    month: 'numeric',
    day: '2-digit', 
    hour: '2-digit', 
    minute: '2-digit', 
    hour12: false, 
    timeZoneName: 'short', 
    timeZone: 'UTC' 
  }

  const emailHtml = `
    <p>Dear ${fullName},</p>
    <p>Your appointment is scheduled for ${date.toLocaleDateString(undefined, timeFormat)}.</p>
    <p>Please confirm your appointment by clicking the link below:</p>
    <a href="${confirmationUrl}" style='padding: 1em;background-color:#00bd13;color:white;border-radius: .5em;text-decoration:unset;margin: 1em auto;'>Confirm appointment</a>`;

  await sendMail(
    email, 
    'Appointment Confirmation', 
    `Dear ${fullName}, please confirm your appointment.`, 
    emailHtml
  );
}

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
