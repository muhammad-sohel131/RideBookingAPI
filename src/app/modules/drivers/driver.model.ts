import { Schema, model } from 'mongoose';
import { IDriver, STATUS } from './driver.interface';

const DriverSchema = new Schema<IDriver>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },
    licenseNumber: {
      type: String,
      required: true,
      unique: true,
    },
    vehicleType: {
      type: String,
      required: true,
    },
    vehicleModel: {
      type: String,
      required: true,
    },
    vehiclePlate: {
      type: String,
      required: true,
      unique: true,
    },
    status: {
      type: String,
      enum: STATUS,
      default: STATUS.PENDING,
    },
    isAvailable: {
        type: Boolean,
        default: false
    },
    currentRide: {
        type: Schema.Types.ObjectId || null,
        ref: 'Ride',
        default: null
    },
    location: {
      lat: { type: Number },
      lng: { type: Number },
    },
  },
  {
    timestamps: true,
  }
);

export const Driver = model<IDriver>('Driver', DriverSchema);
