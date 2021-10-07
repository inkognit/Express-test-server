import { Router } from 'express'
import { create, getAll } from './serv'

const router = Router()

router.get('/api/server', getAll)

router.post('/api/server', create)

export default router
