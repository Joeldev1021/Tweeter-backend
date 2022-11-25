import { inject, injectable } from 'inversify';
import { TweetRepository } from '../../infrastruture/repository/tweet.repository';
import { TYPES } from '../../../types';
import { UuidVO } from '../../../shared/domain/value-objects/uuid.vo';
import { TweetNotFoundException } from '../errors/tweet.not.found.exception';
import { TweetWithUserModel } from '../../domain/models/tweet.model';

@injectable()
export class TweetFindByIdUseCase {
    private tweetRepository: TweetRepository;
    constructor(
        @inject(TYPES.TweetRepository) tweetRepository: TweetRepository
    ) {
        this.tweetRepository = tweetRepository;
    }

    public async execute(id: UuidVO): Promise<TweetWithUserModel | null> {
        const tweetFound = await this.tweetRepository.findById(id);
        if (!tweetFound) throw new TweetNotFoundException();

        return tweetFound;
    }
}
