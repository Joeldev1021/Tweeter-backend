import { UserCreatedEvent } from '../../../shared/domain/events/user/user.created.event';
import { UserFollowingAfterEvent } from '../../../shared/domain/events/user/user.follower.after.event';
import { UserUnfollowedEvent } from '../../../shared/domain/events/user/user.unfollowed.event';
import { AggregateRoot } from '../../../shared/domain/models/aggregate.root';
import { UserEmail } from '../value-objects/UserEmail';
import { UserId } from '../../../shared/domain/value-objects/UserId';
import { UserPassword } from '../value-objects/UserPassword';
import { UserUsername } from '../value-objects/UserUsername';

export class UserModel extends AggregateRoot {
    /**
     * The constructor function takes in a bunch of values, and assigns them to the class properties
     * @param {UserId} id - UserId - The user's unique id
     * @param {UserUsername} username -UserUsername
     * @param {UserEmail} email -UserEmail
     * @param {UserPassword} password - UserPassword,
     * @param {UserId[]} tweetIds - An array of UserId's that represent the tweets that this user has
     * posted.
     * @param {UserId[]} replyIds - UserId[] - This is an array of UserId's that represent the replies
     * that this user has made.
     * @param {UserId[]} followerIds - UserId[]
     * @param {UserId[]} followingIds - UserId[]
     */
    constructor(
        public readonly id: UserId,
        public username: UserUsername,
        public email: UserEmail,
        public password: UserPassword, //public followers: UserId[] | null
        public tweetIds: UserId[],
        public replyIds: UserId[],
        public followerIds: UserId[],
        public followingIds: UserId[]
    ) {
        super();
    }

    static createUser(
        id: UserId,
        username: UserUsername,
        email: UserEmail,
        password: UserPassword,
        tweetIds: UserId[],
        replyIds: UserId[],
        followerIds: UserId[],
        followingIds: UserId[]
    ): UserModel {
        const userModel = new UserModel(
            id,
            username,
            email,
            password,
            tweetIds,
            replyIds,
            followerIds,
            followingIds
        );
        userModel.record(new UserCreatedEvent({ userId: id.value }));
        return userModel;
    }

    public addTweet(tweetId: UserId): void {
        this.tweetIds.push(tweetId);
    }

    public addReply(replyId: UserId): void {
        this.replyIds.push(replyId);
    }

    public followingUser(userId: UserId, followerId: UserId): void {
        /* create event userFollowingAfterEvent */
        this.record(
            new UserFollowingAfterEvent({
                userId: userId.value,
                followerId: followerId.value,
            })
        );
    }

    public addFollower(userId: UserId): void {
        this.followerIds.push(userId);
    }

    public unfollowUser(userId: UserId, unfollowId: UserId): void {
        this.record(
            new UserUnfollowedEvent({
                userId: userId.value,
                unfollowId: unfollowId.value,
            })
        );
    }

    public removeFollower(userId: UserId): void {
        this.followerIds = this.followerIds.filter(
            follower => follower.value !== userId.value
        );
    }
}
