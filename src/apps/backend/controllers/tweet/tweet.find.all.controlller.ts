import { NextFunction, Request, Response } from 'express';
import { inject } from 'inversify';
import { controller, httpGet } from 'inversify-express-utils';
import { TYPES } from '../../../types';
import { TweetFindAllUseCase } from '../../application/usecase/tweet.find.all.usecase';

@controller('/tweet')
export class TweetFindAllController {
    constructor(
        @inject(TYPES.TweetFindAllUseCase)
        private readonly tweetFindAllUseCase: TweetFindAllUseCase
    ) {}

    @httpGet('/', TYPES.AuthMiddleware)
    async execute(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        try {
            const tweetsFound = await this.tweetFindAllUseCase.execute();

            res.status(200).send(tweetsFound);
        } catch (error) {
            next(error);
        }
    }
}
