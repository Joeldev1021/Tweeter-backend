import { AppplicationUnauthorizedException } from '../../../shared/application/errors/application.unauthorized.exception';
import { inject, injectable } from 'inversify';
import { TweetRepository } from '../../infrastruture/repository/tweet.repository';
import { TYPES } from '../../../types';
import { UuidVO } from '../../../shared/domain/valueObjects/Uuid';
import { TweetModel } from '../../domain/models/tweet.model';
import { TweetNotFoundException } from '../errors/tweet.not.found.exception';
@injectable()
export class TweetDeleteByIdUseCase {
    private readonly tweetRepository: TweetRepository;
    constructor(
        @inject(TYPES.TweetRepository) tweetRepository: TweetRepository
    ) {
        this.tweetRepository = tweetRepository;
    }

    public async execute(
        id: UuidVO,
        userId: UuidVO
    ): Promise<TweetModel | null> {
        const tweetFound = await this.tweetRepository.findById(id);
        if (!tweetFound) throw new TweetNotFoundException();

        if (userId.value !== tweetFound.userId.value)
            throw new AppplicationUnauthorizedException();
        return await this.tweetRepository.delete(id);
    }
}
