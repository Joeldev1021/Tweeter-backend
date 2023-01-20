import { NextFunction, Request, Response } from 'express';
import { inject } from 'inversify';
import { controller, httpPost } from 'inversify-express-utils';
import { UuidVO } from '../../../../shared/domain/value-objects/uuid.vo';
import { AuthRequest } from '../../../../shared/infrastruture/types';
import { TYPES } from '../../../../types';
import { BookMarkRemoveUseCase } from '../../../application/usecases/bookmark/book.mark.remove.usecase';

@controller('/bookmark')
export class BookMarkRemoveController {
    constructor(
        @inject(TYPES.BookMarkSaveUseCase)
        private readonly _bookMarkRemoveUseCase: BookMarkRemoveUseCase
    ) {}

    @httpPost('/remove/:id', TYPES.AuthMiddleware)
    async execute(
        req: AuthRequest<Request>,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        const userId = req.userId;
        const tweetId = req.params.id;
        try {
            const tweet = await this._bookMarkRemoveUseCase.execute(
                new UuidVO(userId),
                new UuidVO(tweetId)
            );
            res.status(200).send(tweet);
        } catch (error) {
            next(error);
        }
    }
}
