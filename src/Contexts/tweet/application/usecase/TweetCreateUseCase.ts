import { inject, injectable } from 'inversify';
import { ContentVO } from '../../../shared/domain/valueObjects/ContentValueObject';
import { TYPES } from '../../../types';
import { UuidVO } from '../../../shared/domain/valueObjects/Uuid';
import { TweetModel } from '../../domain/models/tweet.model';
import { TweetIdAlreadyExist } from '../errors/tweet.id.already.exists.exception';
import { ITweetRepository } from '../../domain/repository/tweet.respository';
import { IEventBus } from '../../../shared/domain/types/event-bus.interface';

@injectable()
export class TweetCreateUseCase {
    constructor(
        @inject(TYPES.TweetRepository)
        private readonly tweetRepository: ITweetRepository,
        @inject(TYPES.EventBus)
        private readonly _eventBus: IEventBus
    ) {}

    public async execute(
        id: UuidVO,
        content: ContentVO,
        userId: UuidVO
    ): Promise<TweetModel | null> {
        const findTweet = await this.tweetRepository.findById(id);

        if (findTweet) throw new TweetIdAlreadyExist();

        const tweet = TweetModel.create(id, content, userId);

        const tweetSave = await this.tweetRepository.create(tweet);
        await this._eventBus.publish(tweet.pullDomainEvents());

        return tweetSave;
    }
}
