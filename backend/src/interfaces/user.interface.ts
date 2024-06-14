// user.interface.ts
export interface IUser {
  id?: string;
  full_name: string;
  email: string;
  phone: string;
  state: boolean;
  notifications: boolean;
  created_on: Date;
}