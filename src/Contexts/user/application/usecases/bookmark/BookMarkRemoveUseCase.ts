import { BookmarkVerifyTypeService } from './../../services/bookmark.service';
import { inject, injectable } from 'inversify';
import { TYPES } from '../../../../types';
import { UuidVO } from '../../../../shared/domain/value-objects/Uuid';
import { BookMarkRepository } from '../../../infrastructure/repository/BookMarkMongoRepository';

@injectable()
export class BookMarkRemoveUseCase {
    constructor(
        @inject(TYPES.BookmarkVerifyTypeService)
        private readonly _bookmarkVerifyType: BookmarkVerifyTypeService,
        @inject(TYPES.BookMarkRepository)
        private readonly _booMarkRepository: BookMarkRepository
    ) {}

    public async execute(userId: UuidVO, id: UuidVO): Promise<void> {
        const foundModel = await this._bookmarkVerifyType.execute(id);

        if (!foundModel) throw new Error('not found');

        await this._booMarkRepository.remove(userId, id, foundModel.type);
    }
}
