import { NextFunction, Request, Response } from 'express';
import { inject } from 'inversify';
import { controller, httpPost } from 'inversify-express-utils';
import { UuidVO } from '../../../../shared/domain/value-objects/uuid.vo';
import { AuthRequest } from '../../../../shared/infrastruture/types';
import { TYPES } from '../../../../types';
import { BookMarkSaveUseCase } from '../../../application/usecase/bookmark/book.mark.save.usecase';

@controller('/tweet')
export class BookMarkSaveController {
    constructor(
        @inject(TYPES.BookMarkSaveUseCase)
        private _bookMarkSaveUseCase: BookMarkSaveUseCase
    ) {}
    @httpPost('/save/:id', TYPES.AuthMiddleware)
    async execute(
        req: AuthRequest<Request>,
        res: Response,
        next: NextFunction
    ) {
        const userId = req.userId;
        const tweetId = req.params.id;
        try {
            const tweet = await this._bookMarkSaveUseCase.execute(
                new UuidVO(userId),
                new UuidVO(tweetId)
            );
            res.status(200).send(tweet);
        } catch (error) {
            next(error);
        }
    }
}
