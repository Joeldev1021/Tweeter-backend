import { NextFunction, Request, Response } from 'express';
import { inject } from 'inversify';
import { controller, httpGet } from 'inversify-express-utils';
import { UuidVO } from '../../../../shared/domain/value-objects/uuid.vo';
import { TYPES } from '../../../../types';
import { ReplyFindByParentReplyIdUseCase } from '../../../application/usecases/replyToReply/reply.find.by.parent.reply.usecase';

@controller('/reply-to')
export class ReplyFindByParentReplyIdController {
    constructor(
        @inject(TYPES.ReplyFindByIdUseCase)
        private replyFindByParentReplyIdUseCase: ReplyFindByParentReplyIdUseCase
    ) {}
    @httpGet('/:parentReply', TYPES.AuthMiddleware)
    async execute(req: Request, res: Response, next: NextFunction) {
        const parentReplyId = req.params.parentReply;
        try {
            const replyFound =
                await this.replyFindByParentReplyIdUseCase.execute(
                    new UuidVO(parentReplyId)
                );

            res.status(200).send(replyFound);
        } catch (error) {
            next(error);
        }
    }
}
