import { Router } from "express";
import { driverController } from "./driver.controller";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "../user/user.interface";
import { validateRequest } from "../../middlewares/validateRequest";
import {
  createDriverZodSchema,
  updateDriverStatusZodSchema,
  updateDriverZodSchema,
} from "./driver.validation";

const router = Router();

router.get(
  "/",
  checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
  driverController.getAllDrivers
);
router.get(
  "/pending-driver",
  checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
  driverController.getRequestedDrivers
);

router.post(
  "/register",
  validateRequest(createDriverZodSchema),
  checkAuth(Role.RIDER),
  driverController.registerDriver
);

router.patch(
  "/approve/:userId",
  validateRequest(updateDriverStatusZodSchema),
  checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
  driverController.approveDriver
);

router.patch(
  "/:userId",
  validateRequest(updateDriverZodSchema),
  checkAuth(Role.DRIVER),
  driverController.updateDriver
);

export const driverRoutes = router;
