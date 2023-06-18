import { UserModel } from '../../domain/models/UserModel';
import { UserSchema } from '../schemas/UserSchema';
import { injectable } from 'inversify';
import { BookMarkSchema } from '../schemas/BookMarkSchema';
import { UserEmail } from '../../domain/value-objects/UserEmail';
import { UserPassword } from '../../domain/value-objects/UserPassword';
import { UserUsername } from '../../domain/value-objects/UserUsername';
import { IUser } from '../interface/IUser';
import { UserRepository } from '../../domain/repository/UserRepository';
import { UserId } from '../../../shared/domain/value-objects/UserId';

@injectable()
export class UserMongoRepository implements UserRepository {
    /**
     * It takes an object that implements the IUser interface and returns a UserModel object
     * @param {IUser} persistenceUser - IUser - This is the user object that we get from the database.
     * @returns A UserModel
     */
    /* TODO */
    private toDomain(user: IUser): UserModel {
        return new UserModel(
            new UserId(user._id),
            new UserUsername(user.username),
            new UserEmail(user.email),
            new UserPassword(user.password),
            user.tweetIds
                ? user.tweetIds.map(tweetId => new UserId(tweetId))
                : [],
            user.replyIds
                ? user.replyIds.map(replyId => new UserId(replyId))
                : [],
            user.followerIds
                ? user.followerIds.map(follower => new UserId(follower))
                : [],
            user.followingIds
                ? user.followingIds.map(follower => new UserId(follower))
                : []
        );
    }

    /**
     * It takes a domain user and returns a persistance user
     * @param {UserModel} domainUser - UserModel - this is the domain model that we want to convert to a
     * persistance model.
     * @returns an object of type IUser.
     */

    private toPersistance(domainUser: UserModel): IUser {
        return {
            _id: domainUser.id.value,
            username: domainUser.username.value,
            email: domainUser.email.value,
            password: domainUser.password?.value,
            tweetIds: domainUser.tweetIds.map(id => id.value),
            replyIds: domainUser.replyIds.map(id => id.value),
            followerIds: domainUser.followerIds.map(id => id.value),
            followingIds: domainUser.followingIds.map(id => id.value),
        };
    }

    async create(userModel: UserModel): Promise<UserModel | null> {
        const userPersistance = this.toPersistance(userModel);
        const user = new UserSchema(userPersistance);
        return this.toDomain(await user.save());
    }

    async findById(id: UserId): Promise<UserModel | null> {
        const userFound = await UserSchema.findById(id.value);
        if (!userFound) return null;

        return this.toDomain(userFound);
    }

    async findByEmail(email: UserEmail): Promise<UserModel | null> {
        const userFound = await UserSchema.findOne({ email: email.value });
        if (!userFound) return null;
        return this.toDomain(userFound);
    }

    async findAll(): Promise<UserModel[]> {
        const users = await UserSchema.find();
        return users.map(user => this.toDomain(user));
    }

    async findByUsername(username: UserUsername): Promise<UserModel | null> {
        const userFound = await UserSchema.findOne({
            username: username.value,
        });
        if (!userFound) return null;
        return this.toDomain(userFound);
    }

    async update(user: UserModel): Promise<void> {
        const { _id, ...rest } = this.toPersistance(user);
        await UserSchema.findByIdAndUpdate(_id, rest);
    }

    async following(userId: UserId, followingId: UserId): Promise<void> {
        /* los que yo sigo */
        const user = await UserSchema.findById(userId.value);
        /* validate if user exists and user already following */
        if (!user || user.followerIds?.includes(followingId.value)) return;

        user.followingIds?.push(followingId.value);
        await user.save();
    }

    async unfollow(userId: UserId, followingId: UserId): Promise<void> {
        const user = await UserSchema.findById(userId.value);
        if (!user || !user.followingIds?.includes(userId.value)) return;

        user.followingIds = user.followingIds?.filter(
            follow => follow !== userId.value
        );
        await user.save();
    }

    async bookMark(userId: UserId, tweetId: UserId): Promise<void> {
        await BookMarkSchema.findOne({
            ownerId: userId.value,
        });
    }
}
