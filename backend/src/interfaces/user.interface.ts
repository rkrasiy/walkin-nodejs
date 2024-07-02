// user.interface.ts
export interface IUser {
  id?: string;
  fullName: string;
  email: string;
  phone: string;
  state: boolean;
  notifications: boolean;
  created_on: Date;
}