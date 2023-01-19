import { inject, injectable } from 'inversify';
import { TYPES } from '../../../../types';
import { UuidVO } from '../../../../shared/domain/value-objects/uuid.vo';
import { TweetNotFoundException } from '../../errors/tweet.not.found.exception';
import { ITweetRepository } from '../../../domain/repository/tweet.respository';
import { IBookMarkRepository } from '../../../domain/repository/book.mark.repository';

@injectable()
export class BookMarkSaveUseCase {
    constructor(
        @inject(TYPES.UserRepository)
        private readonly _tweetRepository: ITweetRepository,
        @inject(TYPES.BookMarkRepository)
        private readonly _booMarkRepository: IBookMarkRepository
    ) {}

    public async execute(userId: UuidVO, tweetId: UuidVO): Promise<void> {
        const tweetFound = await this._tweetRepository.findById(userId);
        if (!tweetFound) throw new TweetNotFoundException();

        await this._booMarkRepository.save(userId, tweetId);
    }
}
