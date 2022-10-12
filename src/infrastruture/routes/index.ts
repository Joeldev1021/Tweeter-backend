import express from 'express';
import { authRoutes } from './auth.routes';
const router = express.Router();


router.use('/auth', authRoutes)


export const indexRoutes = router