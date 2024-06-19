
import { Response, Request } from 'express';

import quotesModel from '../models/quotes.model';
import userModel from '../models/user.model';
import { sendMail } from '../services/mail.service';
import { generateConfirmationToken } from '../helpers/utils';

export const getQuotes = async (req:Request, res: Response) => {
  const limit = Number(req.query.limit);
  const offset = Number(req.query.offset);

  const _limit = isNaN(limit) ? 5 : limit;
  const _offset = isNaN(offset) ? 0 : offset;

  const query = {state: true};

  const [total, quotes] = await Promise.all([
    quotesModel.countDocuments(query),
    quotesModel.find(query)
      .skip(_offset)
      .limit(_limit)
  ]);

  res.json({
    total,
    items: quotes
  })
}

export const newQuote = async (req:Request, res: Response) => {

  try{
    const { service, full_name, email, phone, receive_notification, start, end } = req.body;

    let user = await userModel.findOne({email: email, phone: phone});
 
    //Check if user exist
    if(user){
      const current = new Date();
      current.setUTCHours(0, 0, 0, 0);
  
      //Check if user has any future appointments
      const userQuotes = await quotesModel.find({
        start: {
          $gte: start,
        },
      });
  
      //It is not allowed to make new appointments if there is already one.
      if(userQuotes.length > 0){
        res.status(409).json(userQuotes)
      }

    }else{
      user = new userModel({ full_name, email, phone, created_on: (new Date()).toISOString(), notifications: receive_notification });
      await user.save();
      console.log('New user has been created.');
    }

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
      <p>Dear ${full_name},</p>
      <p>Your appointment is scheduled for ${dateStart.toLocaleDateString(undefined, timeFormat)}.</p>
      <p>Please confirm your appointment by clicking the link below:</p>
      <a href="${confirmationUrl}" style='padding: 1em;background-color:#00bd13;color:white;border-radius: .5em;text-decoration:unset;margin: 1em auto;'>Confirm appointment</a>`;

    await sendMail(
      email, 
      'Appointment Confirmation', 
      `Dear ${full_name}, please confirm your appointment.`, 
      emailHtml
    )
    
    const { confirmationToken, ...quote} = newQuote;

    res.status(200).json(quote);

  }catch (err) {
    res.status(500).send('Error: ' + err);
  }
}

export const removeQuote = async (req:Request, res: Response) => {
  const { id } = req.params;

  const user = await quotesModel.findByIdAndUpdate(id, { state: false}, {new: true});
  res.json(user);
}
