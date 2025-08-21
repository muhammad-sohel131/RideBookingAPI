import {Router} from 'express'
import { userRoutes } from '../modules/user/user.routes'
import { authRoutes } from '../modules/auth/auth.route'
import { driverRoutes } from '../modules/drivers/driver.routes'
import { rideRoutes } from '../modules/ride/ride.route'

export const router = Router()

const moduleRoutes = [
    {
        path: '/user',
        route: userRoutes
    },
    {
        path: '/auth',
        route: authRoutes
    },
    {
        path: '/driver',
        route: driverRoutes
    },
    {
        path: '/ride',
        route: rideRoutes
    }
]

moduleRoutes.forEach(route => {
    router.use(route.path, route.route)
})