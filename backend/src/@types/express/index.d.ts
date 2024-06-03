// @types/express/index.d.ts
import { IUser } from '../../path-to-your-user.interface';


declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}
