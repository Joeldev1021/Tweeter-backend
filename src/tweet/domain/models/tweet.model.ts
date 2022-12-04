import { ContentVO } from '../../../shared/domain/value-objects/content.vo';
import { ImageVO } from '../../../shared/domain/value-objects/image.vo';
import { UuidVO } from '../../../shared/domain/value-objects/uuid.vo';
import { CreatedAtVO } from '../../../shared/domain/value-objects/created-at.vo';
import { IOwnerDataVO } from '../../../shared/infrastruture/types';
import { AggregateRoot } from '../../../shared/domain/models/aggregate.root';
import { TweetCreatedEvent } from '../../../shared/domain/events/tweet/tweet.created.event';

export class TweetModel extends AggregateRoot {
    /**
     * The constructor function is a public function that takes in an id, tweet
     * and sets them to the class properties
     * @param {UuidVO} id - UuidVO
     * @param {ContentVO} content - ContentVO
     * @param {ownerId} ownerId - UuidVO
     * @param {ImageVO} image - ImageVO
     */
    constructor(
        public readonly id: UuidVO,
        public content: ContentVO,
        public ownerId: UuidVO,
        public image: ImageVO | null,
        public likes: UuidVO[],
        public reply: UuidVO[],
        public createdAt: CreatedAtVO
    ) {
        super();
    }
    static create(id: UuidVO, content: ContentVO, ownerId: UuidVO): TweetModel {
        const createdAt = new CreatedAtVO(new Date());
        const tweet = new TweetModel(
            id,
            content,
            ownerId,
            null,
            [],
            [],
            createdAt
        );

        tweet.apply(
            new TweetCreatedEvent({
                tweetId: id.value,
                ownerId: ownerId.value,
            })
        );
        return tweet;
    }
}

export class TweetWithUserModel {
    constructor(
        public readonly id: UuidVO,
        public content: ContentVO,
        public image: ImageVO | null,
        public Reply: UuidVO[],
        public likes: UuidVO[],
        public createdAt: CreatedAtVO,
        public ownerId: IOwnerDataVO
    ) {}
}
