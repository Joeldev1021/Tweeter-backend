import express from 'express'
import { container } from '../../container'
import { TYPES } from '../../types'
import { IUserRegisterController } from '../../domain/interface/controller/user.register.controller'

const router = express.Router()

const userRegisterController = container.get<IUserRegisterController>(TYPES.UserRegisterController)

router.post('/register', userRegisterController.execute)
//router.post('/login', userRegisterController.execute)

export const authRoutes = router