import { NextFunction, Response } from 'express'
import { inject, injectable } from 'inversify';
import { BaseMiddleware } from 'inversify-express-utils'
import { TYPES } from '../../types';
import { InfrastructureUnauthorizedException } from '../errors/infrastruture.unauthorized.exception';
import { JwtService } from '../services/jwt.services';
import { AuthRequest } from '../types/index'

@injectable()
export class AuthMiddleware extends BaseMiddleware {
    constructor(
        @inject(TYPES.JwtService) private readonly _jwtService: JwtService,
    ) {
        super();
    }

    public async handler(
        req: AuthRequest<{ userId: string }>,
        res: Response,
        next: NextFunction
    ) {
        const token = req.headers.authorization
        if (!token) throw new InfrastructureUnauthorizedException();
        try {
            const jwtPayload = await this._jwtService.verifyToken(token)
            req.userId = jwtPayload.id
            next()
        } catch (error) {
            throw new InfrastructureUnauthorizedException()
        }
    }

}