import { Router } from "express";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "../user/user.interface";
import { rideController } from "./ride.controller";
import { Ride } from "./ride.model";
import { validateRequest } from "../../middlewares/validateRequest";
import { createRideSchema, updateRideSchema } from "./ride.validate";

const router = Router();

router.post(
  "/create",
  validateRequest(createRideSchema),
  checkAuth(Role.RIDER),
  rideController.createRide
);

router.patch(
  "/update/:rideId",
  validateRequest(updateRideSchema),
  checkAuth(...Object.values(Role)),
  rideController.updateRide
);

router.get(
  "/",
  rideController.getRides
);
router.get("/requested-rides",checkAuth(Role.DRIVER), rideController.getRequestedRides);
export const rideRoutes = router;
