import { Router } from "express";

const router = Router();

router.get('/api/server', (req, res) => {
    res.json({ test: 42 })
})

export default router 