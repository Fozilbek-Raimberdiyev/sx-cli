import { Router } from 'express'
import laravelRoutes from './laravel.route'
import uiRoutes from './ui'
const router = Router({})
router.use('/api/laravel', laravelRoutes)
// ui routes must be at last in the routes
router.use('/', uiRoutes)
export default router
