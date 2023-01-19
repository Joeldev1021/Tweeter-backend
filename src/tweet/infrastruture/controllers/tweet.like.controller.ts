import { NextFunction, Request, Response } from 'express';
import { inject } from 'inversify';
import { controller, httpPost } from 'inversify-express-utils';
import { TYPES } from '../../../types';
import { AuthRequest } from '../../../shared/infrastruture/types';
import { TweetLikeUseCase } from '../../application/usecase/tweet.like.usecase';
import { UuidVO } from '../../../shared/domain/value-objects/uuid.vo';

@controller('/tweet')
export class TweetLikeController {
    constructor(
        @inject(TYPES.TweetLikeUseCase)
        private readonly _tweetLikeUseCase: TweetLikeUseCase
    ) {}

    @httpPost('/like/:id', TYPES.AuthMiddleware)
    async execute(
        req: AuthRequest<Request>,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        const TweetId = req.params.id;

        try {
            const tweetFound = await this._tweetLikeUseCase.execute(
                new UuidVO(TweetId),
                new UuidVO(req.userId)
            );
            res.status(200).send(tweetFound);
        } catch (error) {
            next(error);
        }
    }
}
