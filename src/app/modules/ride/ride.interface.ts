import { Types } from 'mongoose'

export enum RideStatus {
    REQUESTED = 'REQUESTED',
    ACCEPTED = 'ACCEPTED',
    STARTED = 'STARTED',
    COMPLETED = 'COMPLETED',
    CANCELLED = 'CANCELLED'
}
export interface IRide {
  rider: Types.ObjectId
  driver?: Types.ObjectId
  pickupLocation: {
    lat: number
    lng: number
  }
  dropLocation: {
    lat: number
    lng: number
  }
  fare?: number
  status?: RideStatus
  requestedAt?: Date
  acceptedAt?: Date
  startedAt?: Date
  completedAt?: Date
  cancelledAt?: Date
}
