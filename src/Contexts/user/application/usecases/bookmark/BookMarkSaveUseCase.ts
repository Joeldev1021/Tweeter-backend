import { inject, injectable } from 'inversify';
import { TYPES } from '../../../../../apps/backend/dependency-injection/Types';
import { BookmarkVerifyTypeService } from '../../services/BookmarkVerifyTypeService';
import { BookMarkRepository } from '../../../../tweet/domain/repository/BookMarkRepository';
import { UserId } from '../../../../shared/domain/valueObjects/UserId';

@injectable()
export class BookMarkSaveUseCase {
    constructor(
        @inject(TYPES.BookmarkVerifyTypeService)
        private readonly _bookmarkVerifyType: BookmarkVerifyTypeService,
        @inject(TYPES.BookMarkRepository)
        private readonly _booMarkRepository: BookMarkRepository
    ) {}

    public async execute(userId: UserId, id: UserId): Promise<void> {
        const foundModelType = await this._bookmarkVerifyType.execute(id);

        if (!foundModelType) throw new Error('model not found');

        await this._booMarkRepository.save(userId, id, foundModelType.type);
    }
}
