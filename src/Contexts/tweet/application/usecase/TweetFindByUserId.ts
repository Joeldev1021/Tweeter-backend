import { inject, injectable } from 'inversify';
import { TweetRepository } from '../../infrastruture/repository/tweet.repository';
import { TYPES } from '../../../types';
import { UuidVO } from '../../../shared/domain/valueObjects/Uuid';
import { TweetWithUserModel } from '../../domain/models/tweet.model';
import { TweetNotFoundException } from '../errors/tweet.not.found.exception';

@injectable()
export class TweetFindByOwnerIdUseCase {
    private readonly tweetRepository: TweetRepository;
    constructor(
        @inject(TYPES.TweetRepository) tweetRepository: TweetRepository
    ) {
        this.tweetRepository = tweetRepository;
    }

    public async execute(userId: UuidVO): Promise<TweetWithUserModel[] | null> {
        const tweetFounds = await this.tweetRepository.findByOwnerId(userId);
        if (!tweetFounds) throw new TweetNotFoundException();

        return tweetFounds;
    }
}
