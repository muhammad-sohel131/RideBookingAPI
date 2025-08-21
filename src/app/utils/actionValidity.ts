import { RideStatus } from "../modules/ride/ride.interface";
import { Role } from "../modules/user/user.interface";

export const actionValidity = (currentAction: RideStatus, newAction: RideStatus, role: Role) => {
  const actions : Record<
    RideStatus,
    any
  > = {
    REQUESTED : {
        ACCEPTED: ['driver'],
        CANCELLED: ['rider', 'driver']
    },
    ACCEPTED : {
        STARTED: ['driver'],
        CANCELLED: ['driver']
    },
    STARTED : {
        COMPLETED: ['driver']
    },
    COMPLETED : [],
    CANCELLED : [],
  };

  const check = actions[currentAction]?.[newAction]?.includes(role) ?? false;
  return check
};