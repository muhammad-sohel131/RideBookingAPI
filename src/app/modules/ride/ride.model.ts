import { Schema, model } from 'mongoose';
import { IRide, RideStatus } from './ride.interface';

const RideSchema = new Schema<IRide>(
  {
    rider: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    driver: {
      type: Schema.Types.ObjectId,
      ref: 'Driver'
    },
    pickupLocation: {
      lat: { type: Number, required: true },
      lng: { type: Number, required: true },
    },
    dropLocation: {
      lat: { type: Number, required: true },
      lng: { type: Number, required: true },
    },
    status: {
      type: String,
      enum: RideStatus,
      default: RideStatus.REQUESTED,
    },
    fare: {
      type: Number,
      required: true,
    },
    requestedAt: {
      type: Date,
      default: Date.now,
    },
    acceptedAt: Date,
    startedAt: Date,
    completedAt: Date,
    cancelledAt: Date,
  },
  {
    timestamps: false,
  }
);

export const Ride = model<IRide>('Ride', RideSchema);
