import { Router } from 'express'
import { create, getAll } from '../middlewares/middlewares'

const router = Router()

router.get('/api/server', getAll)
router.post('/api/server', create)

export default router
