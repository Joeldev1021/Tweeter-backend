import express from 'express'
import { UserRegisterController } from "../controllers/user.register.controller"
import { UserLoginController } from '../controllers/user.login.controller'

const router = express.Router()

router.post('/register', UserRegisterController.execute)
router.post('/login', UserLoginController.execute)

export const authRoutes = router