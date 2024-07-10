
import { Response, Request } from 'express';
import  {Schema} from 'mongoose';
import {serviceSchema} from '../schemas/service.schema';
import dbConnection from '../database/config';

export const getServices = async (req:Request, res: Response) => {
  const dbName = req.header('x-db-name');
  
  if(!dbName){
    res.status(401).json({message: 'Database name is required'});
  }

  const limit = Number(req.query.limit);
  const offset = Number(req.query.offset);

  const _limit = isNaN(limit) ? 5 : limit;
  const _offset = isNaN(offset) ? 0 : offset;

  const query = {state: true};

  try{
    const serviceModel = await dbConnection(dbName!, 'Service', new Schema(serviceSchema));
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
  }catch(err){
    console.log(err)
    res.status(404).json({message: err})
  }
}

export const updateService = async (req:Request, res: Response) => {

  const { id } = req.params;
  const { _id, ...rest} = req.body;

  //TODO : validate userID
  const serviceModel = req.db.model('Service',  new Schema(serviceSchema) );
  const service = await serviceModel.findByIdAndUpdate(id, rest, { new: true });

  res.json(service);
}

export const newService = async  (req:Request, res: Response) => {

  const { name, price, time, discount } = req.body;
  const serviceModel = req.db.model('Service',  new Schema(serviceSchema) );
  const service = new serviceModel({ name, price, time, discount, created_on: (new Date()).toISOString()  });

  await service.save();
  res.status(201).json(service);
}

export const removeService = async (req:Request, res: Response) => {
  const { id } = req.params;

  const serviceModel = req.db.model('Service',  new Schema(serviceSchema) );
  const service = await serviceModel.findByIdAndUpdate(id, { state: false}, {new: true});
  res.json(service);
}
