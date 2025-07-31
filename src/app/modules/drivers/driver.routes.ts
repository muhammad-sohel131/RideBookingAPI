import { Router } from 'express';
import { driverController } from './driver.controller';
import { checkAuth } from '../../middlewares/checkAuth';
import { Role } from '../user/user.interface';

const router = Router();

router.get('/', checkAuth(Role.ADMIN, Role.SUPER_ADMIN), driverController.getAllDrivers)
router.post('/register',checkAuth(Role.RIDER), driverController.registerDriver);
router.patch('/status/:userId', checkAuth(Role.ADMIN, Role.SUPER_ADMIN), driverController.updateDriver)
router.patch('/:userId', checkAuth(Role.DRIVER), driverController.updateDriver)

export const driverRoutes =  router;
