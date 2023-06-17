import { NextFunction, Response } from 'express';
import { controller, httpPost } from 'inversify-express-utils';
import { inject } from 'inversify';
import { TYPES } from '../../../types';
import { EmailVO } from '../../domain/value-objects/email.vo';
import { PasswordVO } from '../../domain/value-objects/password.vo';
import { UserLoginUseCase } from '../../application/usecases/user.login.usecase';
import { UserRequest } from '../../../shared/infrastruture/types';
import { UserLogintDtoType } from '../dtos/user-login.dto';

@controller('/auth')
export class UserLoginController {
    constructor(
        @inject(TYPES.UserLoginUseCase)
        private userLoginUseCase: UserLoginUseCase
    ) {}

    @httpPost('/login')
    async execute(
        req: UserRequest<UserLogintDtoType>,
        res: Response,
        next: NextFunction
    ) {
        try {
            const { email, password } = req.body;
            const token = await this.userLoginUseCase.execute(
                new EmailVO(email),
                new PasswordVO(password)
            );

            res.status(200).json(token);
        } catch (error) {
            throw error;
        }
    }
}
