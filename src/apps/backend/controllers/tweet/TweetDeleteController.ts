import { NextFunction, Response } from 'express';
import { inject } from 'inversify';
import { controller, httpDelete } from 'inversify-express-utils';
import { TYPES } from '../../../types';
import { TweetDtoType } from '../../../shared/infrastruture/dtos/tweet.dto';
import { TweetRequest } from '../../../shared/infrastruture/types';
import { UuidVO } from '../../../shared/domain/value-objects/uuid.vo';
import { TweetDeleteByIdUseCase } from '../../application/usecase/tweet.delete.usecase';

@controller('/tweet')
export class TweetDeleteByIdController {
    constructor(
        @inject(TYPES.TweetDeleteByIdUseCase)
        private readonly tweetDeleteByIdUseCase: TweetDeleteByIdUseCase
    ) {}

    @httpDelete('/:id', TYPES.AuthMiddleware)
    async execute(
        req: TweetRequest<TweetDtoType>,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        const id = req.params.id;
        try {
            const tweetDelete = await this.tweetDeleteByIdUseCase.execute(
                new UuidVO(id),
                new UuidVO(req.userId)
            );
            res.status(201).send();
        } catch (error) {
            next(error);
        }
    }
}
