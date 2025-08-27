export enum Role {
    RIDER = 'rider',
    DRIVER = 'driver',
    ADMIN = 'admin',
    SUPER_ADMIN = 'super_admin',
} 
export interface IAuthProvider {
    provider: 'google' | 'credentials',
    providerId : string
}

export interface IUser {
  _id?: string;
  name: string;
  email: string;
  phone: string;
  password: string;
  role: Role;
  isBlocked?: boolean;
  auths: [IAuthProvider],
  currentRide?: string
}
