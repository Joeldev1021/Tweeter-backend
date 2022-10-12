import express from 'express'
import { UserRegsiterController } from "../controllers/user.register.controller"

const router = express.Router()
const userRegisterContrller = new UserRegsiterController()

router.post('/register', userRegisterContrller.execute)

export const authRoutes = router