
import { Response, Request } from 'express';

import serviceModel from '../models/service.model';

export const getServices = async (req:Request, res: Response) => {
  const limit = Number(req.query.limit);
  const offset = Number(req.query.offset);

  const _limit = isNaN(limit) ? 5 : limit;
  const _offset = isNaN(offset) ? 0 : offset;

  const query = {state: true};

  const [total, services] = await Promise.all([
    serviceModel.countDocuments(query),
    serviceModel.find(query)
      .skip(_offset)
      .limit(_limit)
  ]);

  res.json({
    total,
    items: services
  })
}

export const updateService = async (req:Request, res: Response) => {

  const { id } = req.params;
  const { _id, ...rest} = req.body;

  //TODO : validate userID
  const service = await serviceModel.findByIdAndUpdate(id, rest, { new: true });

  res.json(service);
}

export const newService = async  (req:Request, res: Response) => {

  const { name, price, time, discount } = req.body;
  const service = new serviceModel({ name, price, time, discount });

  await service.save();
  res.status(201).json(service);
}

export const removeService = async (req:Request, res: Response) => {
  const { id } = req.params;

  const service = await serviceModel.findByIdAndUpdate(id, { state: false}, {new: true});
  res.json(service);
}
