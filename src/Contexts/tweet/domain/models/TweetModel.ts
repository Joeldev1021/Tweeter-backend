import { TweetCreatedEvent } from '../../../shared/domain/events/tweet/TweetCreatedEvent';
import { AggregateRoot } from '../../../shared/domain/models/AggregateRoot';
import { CreatedAtVO } from '../../../shared/domain/valueObjects/CreatedAtVO';
import { UserId } from '../../../shared/domain/valueObjects/UserId';
import { TweetContent } from '../valueObjects/TweetContent';
import { TweetId } from '../valueObjects/TweetId';
import { TweetImage } from '../valueObjects/TweetImage';

export class TweetModel extends AggregateRoot {
    /**
     * This is a constructor function for a Tweet object with various properties such as id, content,
     * userId, image, createdAt, likes, and reply.
     * @param {TweetId} id - A unique identifier for the tweet, of type TweetId.
     * @param {TweetContent} content - The content of the tweet, represented by a TweetContent object.
     * @param {UserId} userId - The userId parameter is a unique identifier for the user who created
     * the tweet.
     * @param {TweetImage | null} image - TweetImage or null - this parameter represents an optional
     * image that can be attached to a tweet. It can either be a TweetImage object or null if no image
     * is attached.
     * @param {CreatedAtVO} createdAt - createdAt is a parameter of type CreatedAtVO, which represents
     * the date and time when the tweet was created. It is a value object that ensures that the date
     * and time are valid and in the correct format.
     * @param {UserId[]} likes - An array of user IDs representing the users who have liked the tweet.
     * @param {UserId[]} reply - The "reply" parameter is an array of user IDs representing the users
     * who have replied to the tweet.
     */
    constructor(
        public readonly id: TweetId,
        public content: TweetContent,
        public userId: UserId,
        public image: TweetImage | null,
        public createdAt: CreatedAtVO,
        public likes: UserId[],
        public reply: UserId[]
    ) {
        super();
    }

    static create(
        id: TweetId,
        content: TweetContent,
        userId: UserId
    ): TweetModel {
        const createdAt = new CreatedAtVO(new Date());
        const tweet = new TweetModel(
            id,
            content,
            userId,
            null,
            createdAt,
            [],
            []
        );

        tweet.record(
            new TweetCreatedEvent({
                tweetId: id.value,
                userId: userId.value,
            })
        );
        return tweet;
    }
}
