import { inject, injectable } from 'inversify';
import { TYPES } from '../../../../../apps/backend/dependency-injection/Types';
import { BookmarkVerifyTypeService } from '../../services/BookmarkVerifyTypeService';
import { BookMarkRepository } from '../../../../tweet/domain/repository/BookMarkRepository';
import { UserId } from '../../../../shared/domain/valueObjects/UserId';

@injectable()
export class BookMarkRemoveUseCase {
    constructor(
        @inject(TYPES.BookmarkVerifyTypeService)
        private readonly _bookmarkVerifyType: BookmarkVerifyTypeService,
        @inject(TYPES.BookMarkRepository)
        private readonly _booMarkRepository: BookMarkRepository
    ) {}

    public async execute(userId: UserId, id: UserId): Promise<void> {
        const foundModel = await this._bookmarkVerifyType.execute(id);

        if (!foundModel) throw new Error('not found');

        await this._booMarkRepository.remove(userId, id, foundModel.type);
    }
}
