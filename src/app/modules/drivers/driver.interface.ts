import { Types } from 'mongoose';

export enum STATUS {
    PENDING = 'PENDING',
    APPROVED = 'APPROVED',
    SUSPENDED = 'SUSPENDED'
}
export interface IDriver {
  user: Types.ObjectId;
  licenseNumber: string;
  vehicleType: string;
  vehicleModel: string;
  vehiclePlate: string;
  status: STATUS;
  rating: number;
  totalRides: number;
  isAvailable?: boolean,
  currentRide?: Types.ObjectId | null,
  location: {
    lat: number;
    lng: number;
  };
}
