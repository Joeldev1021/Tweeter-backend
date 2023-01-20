import { inject, injectable } from 'inversify';
import { TYPES } from '../../../../types';
import { UuidVO } from '../../../../shared/domain/value-objects/uuid.vo';
import { BookMarkRepository } from '../../../../user/infrastructure/repository/book.mark.repository';
import { ITweetRepository } from '../../../../tweet/domain/repository/tweet.respository';
import { TweetNotFoundException } from '../../../../tweet/application/errors/tweet.not.found.exception';

@injectable()
export class BookMarkRemoveUseCase {
    constructor(
        @inject(TYPES.TweetRepository)
        private readonly _booMarkRepository: BookMarkRepository,
        @inject(TYPES.BookMarkRepository)
        private readonly _tweetRepository: ITweetRepository
    ) {}

    public async execute(userId: UuidVO, tweetId: UuidVO): Promise<void> {
        const tweetFound = await this._tweetRepository.findById(userId);
        if (!tweetFound) throw new TweetNotFoundException();

        await this._booMarkRepository.remove(userId, tweetId);
    }
}
