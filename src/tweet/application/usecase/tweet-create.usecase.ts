import { inject, injectable } from 'inversify';
import { ContentVO } from '../../../shared/domain/value-objects/content.vo';
import { TweetRepository } from '../../infrastruture/repository/tweet.repository';
import { TYPES } from '../../../types';
import { UuidVO } from '../../../shared/domain/value-objects/uuid.vo';
import { TweetModel } from '../../domain/models/tweet.model';
import { TweetIdAlreadyExist } from '../errors/tweet.id.already.exists.exception';
import { ITweetRepository } from '../../domain/repository/tweet.respository';
import { IEventBus } from '../../../shared/domain/events/event-bus.interface';

@injectable()
export class TweetCreateUseCase {
    constructor(
        @inject(TYPES.TweetRepository)
        private tweetRepository: ITweetRepository,
        @inject(TYPES.EventBus)
        private _eventBus: IEventBus
    ) {}

    public async execute(
        id: UuidVO,
        content: ContentVO,
        ownerId: UuidVO
    ): Promise<TweetModel | null> {
        const findTweet = await this.tweetRepository.findById(id);

        if (findTweet) throw new TweetIdAlreadyExist();

        const tweet = TweetModel.create(id, content, ownerId);

        const tweetSave = await this.tweetRepository.create(tweet);

        this._eventBus.publishMany(tweet.getEvents());

        return tweetSave;
    }
}
