// user.interface.ts
export interface IUser {
  id: string;
  name: string;
  surname: string;
  phone: string;
  email: string;
  avatar?: string;
  role: Role;
  state: boolean;
  service?: string;
}

export enum Role {
  ADMIN = 'admin',
  MANAGER = 'manager',
  BASIC = 'basic'
}
