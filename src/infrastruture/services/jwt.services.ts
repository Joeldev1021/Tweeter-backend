import { injectable } from 'inversify'
import jwt, { type SignOptions } from 'jsonwebtoken'
import { JwtPayload } from '../types'

const jwtSecret = process.env.JWT_SECRET_KEY || 'default_secret'

@injectable()
export class JwtService {

    async verifyToken(token: string) {
        return jwt.verify(token, jwtSecret) as JwtPayload
    }

    async signToken(payload: JwtPayload, signOptions: SignOptions) {
        return jwt.sign(payload, jwtSecret, signOptions)
    }
}