import { NextFunction, Response } from 'express';
import { controller, httpPost } from 'inversify-express-utils';
import { TweetRequest } from '../../../../shared/infrastruture/types';
import { inject } from 'inversify';
import { TYPES } from '../../../../types';
import { TweetDtoType } from '../../../../shared/infrastruture/dtos/tweet.dto';
import { UuidVO } from '../../../../shared/domain/value-objects/uuid.vo';
import { ContentVO } from '../../../../shared/domain/value-objects/content.vo';
import { ReplyCreateToReplyUseCase } from '../../../application/usecases/replyToReply/reply.create.to.reply';
import { ReplyModel } from '../../../domain/model/reply.model';

@controller('/reply-to')
export class ReplyCreateToReplyController {
    constructor(
        @inject(TYPES.ReplyCreateToReplyUseCase)
        private readonly replyCreateToReplyUseCase: ReplyCreateToReplyUseCase
    ) {}

    @httpPost('/:tweetId/:parentReplyId', TYPES.AuthMiddleware)
    async execute(
        req: TweetRequest<TweetDtoType>,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        const tweetId = req.params.tweetId;
        const parentReplyId = req.params.parentReplyId;
        const { id, content } = req.body;
        try {
            const replyCreated = await this.replyCreateToReplyUseCase.execute(
                new UuidVO(id),
                new ContentVO(content),
                new UuidVO(tweetId),
                new UuidVO(req.userId),
                new UuidVO(parentReplyId)
            );
            res.status(201).send(replyCreated);
        } catch (error) {
            next(error);
        }
    }
}
