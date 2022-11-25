import { ReplyFindByIdUseCase } from '../../application/usecases/reply.find.by.id.usecase';
import { NextFunction, Request, Response } from 'express';
import { inject } from 'inversify';
import { controller, httpGet } from 'inversify-express-utils';
import { UuidVO } from '../../../shared/domain/value-objects/uuid.vo';
import { TYPES } from '../../../types';

@controller('/reply')
export class ReplyFindByIdController {
    constructor(
        @inject(TYPES.ReplyFindByIdUseCase)
        private replyFindByIdUseCase: ReplyFindByIdUseCase
    ) {}
    @httpGet('/:id', TYPES.AuthMiddleware)
    async execute(req: Request, res: Response, next: NextFunction) {
        const id = req.params.id;
        try {
            const replyFound = await this.replyFindByIdUseCase.execute(
                new UuidVO(id)
            );

            res.status(200).send(replyFound);
        } catch (error) {
            next(error);
        }
    }
}
