
import { Response, Request } from 'express';

import quotesModel from '../models/quotes.model';
import { isUserExist } from '../helpers/db-validators';
import userModel from '../models/user.model';
import { IUser } from '../interfaces/user.interface';
import { sendMail } from '../services/mail.service';

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

  const { service, full_name, email, phone, receive_notification, start, end } = req.body;

  let user = await isUserExist(email, phone);

  if(!user){
    console.log('Creating new user ...');
    user = new userModel({ full_name, email, phone, created_on: (new Date()).toISOString(), notifications: receive_notification });
    await user.save();
  }
  
  const quote = new quotesModel({ service, user: user.id, start, end, created_on: (new Date()).toISOString() });

  await quote.save();
  await sendMail(email, 'Confirm you appointment', `${quote.id} and user: ${user.id}`)
  
  res.status(201).json(quote);
}

export const removeQuote = async (req:Request, res: Response) => {
  const { id } = req.params;

  const user = await quotesModel.findByIdAndUpdate(id, { state: false}, {new: true});
  res.json(user);
}
