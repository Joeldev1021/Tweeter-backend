import { inject, injectable } from 'inversify';
import { ContentVO } from '../../../shared/domain/value-objects/content.vo';
import { TweetRepository } from '../../infrastruture/repository/tweet.repository';
import { TYPES } from '../../../types';
import { UuidVO } from '../../../shared/domain/value-objects/uuid.vo';
import { TweetModel } from '../../domain/models/tweet.model';
import { TweetIdAlreadyExist } from '../errors/tweet.id.already.exists.exception';
import { CreatedAtVO } from '../../../shared/domain/value-objects/created-at.vo';

@injectable()
export class TweetCreateUseCase {
    private tweetRepository: TweetRepository;
    constructor(
        @inject(TYPES.TweetRepository) tweetRepository: TweetRepository
    ) {
        this.tweetRepository = tweetRepository;
    }

    public async execute(
        id: UuidVO,
        content: ContentVO,
        ownerId: UuidVO
    ): Promise<TweetModel | null> {
        const findTweet = await this.tweetRepository.findById(id);
        if (findTweet) throw new TweetIdAlreadyExist();
        return await this.tweetRepository.create(
            new TweetModel(
                id,
                content,
                ownerId,
                null,
                [],
                [],
                new CreatedAtVO(new Date())
            )
        );
    }
}
