
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

export const updateQuote = async (req:Request, res: Response) => {

  const { id } = req.params;
  const { _id, ...rest} = req.body;

  //TODO : validate userID
  const quote = await quotesModel.findByIdAndUpdate(id, rest, { new: true });

  res.json(quote);
}

export const newQuote = async (req:Request, res: Response) => {

  try{
    const { service, full_name, email, phone, receive_notification, start, end } = req.body;

    let user = await userModel.findOne({email: email, phone: phone});

    // Generate confirmation token
    const confirmationToken = generateConfirmationToken();
  
    if(!user){
      console.log('Creating new user ...');
      user = new userModel({ full_name, email, phone, created_on: (new Date()).toISOString(), notifications: receive_notification });
      await user.save();
    }
    
    const quote = new quotesModel({ 
      service, 
      user: user.id, 
      start: new Date(start), 
      end: new Date(end), 
      created_on: (new Date()).toISOString(),
      confirmationToken
    });
  
    await quote.save();


    // Send confirmation email
    const confirmationUrl = `http://localhost/confirm-appointment?token=${confirmationToken}`;

    const emailHtml = `
      <p>Dear ${full_name},</p>
      <p>Your appointment is scheduled for ${start}.</p>
      <p>Please confirm your appointment by clicking the link below:</p>
      <a href="${confirmationUrl}" style='padding: 1em;background-color:#00bd13;color:white;border-radius: .5em;text-decoration:unset;'>Confirm appointment</a>`;

    await sendMail(email, 'Appointment Confirmation', `Dear ${full_name}, please confirm your appointment.`, emailHtml)
    
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
