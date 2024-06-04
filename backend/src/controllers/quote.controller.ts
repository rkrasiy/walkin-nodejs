
import { Response, Request } from 'express';

import quotesModel from '../models/quotes.model';

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

  const { service, user, start, end } = req.body;
  console.log('HEHRERERE', { service, user, start, end })
  const quote = new quotesModel({ service, user, start, end, created_on: (new Date()).toISOString() });

  await quote.save();
  res.status(201).json(quote);
}

export const removeQuote = async (req:Request, res: Response) => {
  const { id } = req.params;

  const user = await quotesModel.findByIdAndUpdate(id, { state: false}, {new: true});
  res.json(user);
}
