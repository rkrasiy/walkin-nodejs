
import { Response, Request } from 'express';
import bcryptjs from 'bcryptjs';

import managerModel from '../models/manager.model';

export const getManagers = async (req: Request, res: Response) => {
  const limit = Number(req.query.limit);
  const offset = Number(req.query.offset);

  const _limit = isNaN(limit) ? 5 : limit;
  const _offset = isNaN(offset) ? 0 : offset;

  const query = {state: true};

  const [total, users] = await Promise.all([
    managerModel.countDocuments(query),
    managerModel.find(query)
      .skip(_offset)
      .limit(_limit)
  ]);

  console.log("USERS: ", users)

  res.json({
    total,
    items: users
  })
}

export const updateManagers = async (req:Request, res: Response) => {

  const { id } = req.params;
  const { _id, password, ...rest} = req.body;

  //TODO : validate userID

    // Crypt password
  if( password ){
    const salt = bcryptjs.genSaltSync();
    rest.password = bcryptjs.hashSync(password, salt);
  }

  const user = await managerModel.findByIdAndUpdate(id, rest, { new: true });

  res.json(user);
}

export const newManager = async  (req:Request, res: Response) => {

  const { name, email, password, role, phone, surname} = req.body;
  const user = new managerModel({ name, email, password, role, surname, phone });

  // Crypt password
  const salt = bcryptjs.genSaltSync();
  user.password = bcryptjs.hashSync(password, salt);

  await user.save();


  res.status(201).json(user);
}

export const removeManager = async (req:Request, res: Response) => {
  const { id } = req.params;

  const user = await managerModel.findByIdAndUpdate(id, { state: false}, {new: true});

  
  res.json(user);
}
