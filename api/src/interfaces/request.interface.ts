import { Request } from "express"
import { IUser } from "./user.interface"

export interface IGetUserAuthInfoRequest extends Request {
  user?: IUser
}
