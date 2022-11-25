import { NextFunction, Request, Response } from 'express';
import { controller, httpGet } from 'inversify-express-utils';
import { TYPES } from '../../../types';
import { inject } from 'inversify';
import { TweetFindByIdUseCase } from '../../application/usecase/tweet.find.by.id.usecase';
import { ReplyFindByTweetIdUseCase } from '../../../reply/application/usecases/reply.find.by.tweet.usecase';
import { UuidVO } from '../../../shared/domain/value-objects/uuid.vo';

@controller('/tweet')
export class TweetFindAllReplyController {
    constructor(
        @inject(TYPES.TweetFindByIdUseCase)
        private tweetFindByIdUseCase: TweetFindByIdUseCase //private replyFindByTweetIdUseCase: ReplyFindByTweetIdUseCase
    ) {}
    // @inject(TYPES.ReplyFindByTweetIdUseCase)
    @httpGet('/reply-all/:id', TYPES.AuthMiddleware)
    async execute(req: Request, res: Response, next: NextFunction) {
        const tweetId = req.params.id;
        try {
            const tweet = await this.tweetFindByIdUseCase.execute(
                new UuidVO(tweetId)
            );
            /*  const replys = await this.replyFindByTweetIdUseCase.execute(
                new UuidVO(tweetId)
            ); */

            res.status(200).json({
                tweet,
            });
        } catch (error) {
            next(error);
        }
    }
}
