import jwt, { type SignOptions } from 'jsonwebtoken'
import { JwtPayload } from '../types'

const jwtSecret = process.env.JWT_SECRET_KEY || 'default_secret'

export const signTokenAsync = async (payload: JwtPayload, signOptions: SignOptions) => {
    return jwt.sign(payload, jwtSecret, signOptions)
}

export const verifyTokenAsync = async (token: string) => {
    const resultToken = await jwt.verify(token, jwtSecret)
    return resultToken as JwtPayload
}

