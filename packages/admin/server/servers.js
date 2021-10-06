import { Router } from "express";

var router = Router();

router.get('/api/server', function (req, res) {
    res.json({ test: 42 });
});

export default router;