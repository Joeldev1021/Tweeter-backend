import { inject, injectable } from 'inversify';
import { TYPES } from '../../../../types';
import { UuidVO } from '../../../../shared/domain/value-objects/uuid.vo';
import { TweetNotFoundException } from '../../errors/tweet.not.found.exception';
import { BookMarkRepository } from '../../../infrastruture/repository/book.mark.repository';
import { ITweetRepository } from '../../../domain/repository/tweet.respository';
import { TweetRepository } from '../../../infrastruture/repository/tweet.repository';
import { IBookMarkRepository } from '../../../domain/repository/book.mark.repository';

@injectable()
export class BookMarkSaveUseCase {
    private _tweetRepository: ITweetRepository;
    private _booMarkRepository: IBookMarkRepository;

    constructor(
        @inject(TYPES.UserRepository)
        @inject(TYPES.BookMarkRepository)
        tweetRepository: TweetRepository,
        bookMarkRepository: BookMarkRepository
    ) {
        this._tweetRepository = tweetRepository;
        this._booMarkRepository = bookMarkRepository;
    }

    public async execute(userId: UuidVO, tweetId: UuidVO): Promise<void> {
        const tweetFound = await this._tweetRepository.findById(userId);
        if (!tweetFound) throw new TweetNotFoundException();

        await this._booMarkRepository.save(userId, tweetId);
    }
}
