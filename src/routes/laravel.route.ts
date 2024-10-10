import { Router } from 'express'
const router = Router({})
import { generateEnity } from '../controllers/laravel/entity.controller'
import { getMigrationTypes } from '../controllers/laravel/references.controller'
import {
    buildScheme,
    handleSchemeEvents,
} from '../controllers/laravel/scheme.controller'
// get migration types
router.get('/migration-types', getMigrationTypes)

// generate entity
router.post('/create-entity', generateEnity)
router.get('/events/scheme', handleSchemeEvents)
router.post('/build-scheme', buildScheme)

export default router
