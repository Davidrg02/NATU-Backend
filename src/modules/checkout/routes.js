import {Router} from 'express';

const router = Router();

router.get('/create-order', (req, res) => res.send('Creating order'));

router.get('/success', (req, res) => res.send('Success'));

router.get('/cancel', (req, res) => res.send('webhook'));

export default router;