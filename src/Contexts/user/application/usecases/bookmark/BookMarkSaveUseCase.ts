import { inject, injectable } from 'inversify';
import { TYPES } from '../../../../types';
import { UuidVO } from '../../../../shared/domain/value-objects/uuid.vo';
import { IBookMarkRepository } from '../../../../tweet/domain/repository/book.mark.repository';
import { BookmarkVerifyTypeService } from '../../services/bookmark.service';

@injectable()
export class BookMarkSaveUseCase {
    constructor(
        @inject(TYPES.BookmarkVerifyTypeService)
        private readonly _bookmarkVerifyType: BookmarkVerifyTypeService,
        @inject(TYPES.BookMarkRepository)
        private readonly _booMarkRepository: IBookMarkRepository
    ) {}

    public async execute(userId: UuidVO, id: UuidVO): Promise<void> {
        const foundModelType = await this._bookmarkVerifyType.execute(id);

        if (!foundModelType) throw new Error('model not found');

        await this._booMarkRepository.save(userId, id, foundModelType.type);
    }
}
