import { inject, injectable } from 'inversify';
import { TweetRepository } from '../../infrastruture/repository/tweet.repository';
import { TYPES } from '../../../types';
import { UuidVO } from '../../../shared/domain/value-objects/uuid.vo';
import { TweetModel } from '../../domain/models/tweet.model';
import { TweetNotFoundException } from '../errors/tweet.not.found.exception';

@injectable()
export class TweetLikeUseCase {
    private tweetRepository: TweetRepository;
    constructor(
        @inject(TYPES.TweetRepository) tweetRepository: TweetRepository
    ) {
        this.tweetRepository = tweetRepository;
    }

    public async execute(
        tweetId: UuidVO,
        userId: UuidVO
    ): Promise<TweetModel | null> {
        const tweetFound = await this.tweetRepository.findById(tweetId);
        if (!tweetFound) throw new TweetNotFoundException();

        return await this.tweetRepository.like(tweetId, userId);
    }
}
