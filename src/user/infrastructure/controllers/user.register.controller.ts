import { NextFunction, Response } from 'express';
import { inject } from 'inversify';
import { controller, httpPost } from 'inversify-express-utils';
import { TYPES } from '../../../types';
import { UserRequest } from '../../../shared/infrastruture/types';
import { UserRegistertDtoType } from '../dtos/user-register.dto';
import { EmailVO } from '../../domain/value-objects/email.vo';
import { UsernameVO } from '../../domain/value-objects/username.vo';
import { PasswordVO } from '../../domain/value-objects/password.vo';
import { UuidVO } from '../../../shared/domain/value-objects/uuid.vo';
import { UserRegisterUseCase } from '../../application/usecases/user.register.usecase';
import { UnnecesayFieldsExceptions } from '../../../shared/infrastruture/errors/unnecesay.fields.exception';

@controller('/auth')
export class UserRegisterController {
    constructor(
        @inject(TYPES.UserRegisterUseCase)
        private userRegisterUseCase: UserRegisterUseCase
    ) {}
    @httpPost('/register')
    async execute(
        req: UserRequest<UserRegistertDtoType>,
        res: Response,
        next: NextFunction
    ) {
        const { id, username, email, password, ...rest } = req.body;
        try {
            if (Object.keys(rest).length > 0)
                throw new UnnecesayFieldsExceptions();
            const token = await this.userRegisterUseCase.execute(
                new UuidVO(id),
                new UsernameVO(username),
                new EmailVO(email),
                await PasswordVO.create(password)
            );

            res.status(201).send(token);
        } catch (error) {
            throw error;
        }
    }
}
