import { NextFunction, Response } from 'express';
import { controller, httpPost } from 'inversify-express-utils';
import { TweetRequest } from '../../../../shared/infrastruture/types';
import { inject } from 'inversify';
import { TYPES } from '../../../../types';
import { TweetDtoType } from '../../../../shared/infrastruture/dtos/tweet.dto';
import { UuidVO } from '../../../../shared/domain/value-objects/uuid.vo';
import { ContentVO } from '../../../../shared/domain/value-objects/content.vo';
import { ReplyCreateToReplyUseCase } from '../../../application/usecases/replyToReply/reply.create.to.reply';

@controller('/reply-to')
export class ReplyCreateToReplyController {
    constructor(
        @inject(TYPES.ReplyCreateToReplyUseCase)
        private replyCreateToReplyUseCase: ReplyCreateToReplyUseCase
    ) {}
    @httpPost('/:tweetId/:replyId', TYPES.AuthMiddleware)
    async execute(
        req: TweetRequest<TweetDtoType>,
        res: Response,
        next: NextFunction
    ) {
        const tweetId = req.params.tweetId;
        const replyId = req.params.replyId;
        const { id, content } = req.body;
        try {
            const replyCreated = await this.replyCreateToReplyUseCase.execute(
                new UuidVO(id),
                new ContentVO(content),
                new UuidVO(tweetId),
                new UuidVO(req.userId),
                new UuidVO(replyId)
            );

            res.status(201).send(replyCreated);
        } catch (error) {
            next(error);
        }
    }
}
