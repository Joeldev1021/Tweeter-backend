import { ContentVO } from '../../../shared/domain/value-objects/content.vo';
import { ImageVO } from '../../../shared/domain/value-objects/image.vo';
import { UuidVO } from '../../../shared/domain/value-objects/uuid.vo';
import { CreatedAtVO } from '../../../shared/domain/value-objects/created-at.vo';
import { IOwnerDataVO } from '../../../shared/infrastruture/types';
import { AggregateRoot } from '../../../shared/domain/models/aggregate.root';
import { TweetCreatedEvent } from '../../../shared/domain/events/tweet/tweet.created.event';

export class TweetModel extends AggregateRoot {
    /**
     * A constructor function.
     * @param {UuidVO} id - UuidVO - The id of the post
     * @param {ContentVO} content - The content of the post.
     * @param {UuidVO} ownerId - The user who created the post
     * @param {ImageVO | null} image - ImageVO | null
     * @param {UuidVO[]} likes - UuidVO[]
     * @param {UuidVO[]} reply - UuidVO[]
     * @param {CreatedAtVO} createdAt - CreatedAtVO
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

        tweet.record(
            new TweetCreatedEvent({
                tweetId: id.value,
                ownerId: ownerId.value,
            })
        );
        return tweet;
    }

    public addReply(id: UuidVO) {
        this.reply.push(id);
    }
}

/* class Tweet with User Owner */
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
