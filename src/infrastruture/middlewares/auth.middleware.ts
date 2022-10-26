import { NextFunction, Request, Response } from 'express'
import { inject, injectable } from 'inversify';
import { BaseMiddleware } from 'inversify-express-utils'
import { TYPES } from '../../types';
import { InfrastructureUnauthorizedException } from '../errors/infrastruture.unauthorized.exception';
import { verifyTokenAsync } from '../services/jwt.services';
import { AuthRequest, UserRequest } from '../types/index'

@injectable()
export class AuthMiddleware extends BaseMiddleware {

    public async handler(
        req: AuthRequest<{ userId: string }>,
        res: Response,
        next: NextFunction
    ) {
        const token = req.headers.authorization
        if (!token) throw new InfrastructureUnauthorizedException();
        try {
            const jwtPayload = await verifyTokenAsync(token)
            req.userId = jwtPayload.id
            next()
        } catch (error) {
            throw new InfrastructureUnauthorizedException()
        }
    }

}