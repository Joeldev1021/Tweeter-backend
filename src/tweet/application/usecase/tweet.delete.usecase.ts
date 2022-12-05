import { AppplicationUnauthorizedException } from '../../../shared/application/errors/application.unauthorized.exception';
import { inject, injectable } from 'inversify';
import { TweetRepository } from '../../infrastruture/repository/tweet.repository';
import { TYPES } from '../../../types';
import { UuidVO } from '../../../shared/domain/value-objects/uuid.vo';
import { TweetModel } from '../../domain/models/tweet.model';
import { TweetNotFoundException } from '../errors/tweet.not.found.exception';
@injectable()
export class TweetDeleteByIdUseCase {
    private tweetRepository: TweetRepository;
    constructor(
        @inject(TYPES.TweetRepository) tweetRepository: TweetRepository
    ) {
        this.tweetRepository = tweetRepository;
    }

    public async execute(
        id: UuidVO,
        ownerId: UuidVO
    ): Promise<TweetModel | null> {
        const tweetFound = await this.tweetRepository.findById(id);
        if (!tweetFound) throw new TweetNotFoundException();

        if (ownerId.value !== tweetFound.ownerId.value)
            throw new AppplicationUnauthorizedException();
        return this.tweetRepository.delete(id);
    }
}
