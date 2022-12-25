import { UserModel } from '../../domain/models/user.model';
import { UserSchema } from '../schemas/user.schema';
import { UsernameVO } from '../../domain/value-objects/username.vo';
import { PasswordVO } from '../../domain/value-objects/password.vo';
import { EmailVO } from '../../domain/value-objects/email.vo';
import { IUserRepository } from '../../domain/repository/user.repository';
import { IUser } from '../interface/user.interface';
import { injectable } from 'inversify';
import { UuidVO } from '../../../shared/domain/value-objects/uuid.vo';

@injectable()
export class UserRepository implements IUserRepository {
    /**
     * It takes an object that implements the IUser interface and returns a UserModel object
     * @param {IUser} persistanceUser - IUser - This is the user object that we get from the database.
     * @returns A UserModel
     */
    /* TODO */
    private toDomain(persistanceUser: IUser): UserModel {
        const {
            _id,
            username,
            email,
            password,
            tweetIds,
            replyIds,
            followerIds,
            followingIds,
        } = persistanceUser;
        return new UserModel(
            new UuidVO(_id),
            new UsernameVO(username),
            new EmailVO(email),
            new PasswordVO(password),
            tweetIds ? tweetIds.map(tweetId => new UuidVO(tweetId)) : [],
            replyIds ? replyIds.map(replyId => new UuidVO(replyId)) : [],
            followerIds
                ? followerIds.map(follower => new UuidVO(follower))
                : [],
            followingIds
                ? followingIds.map(follower => new UuidVO(follower))
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

    async findById(id: UuidVO): Promise<UserModel | null> {
        const userFound = await UserSchema.findById(id.value);
        if (!userFound) return null;

        return this.toDomain(userFound);
    }

    async findByEmail(email: EmailVO): Promise<UserModel | null> {
        const userFound = await UserSchema.findOne({ email: email.value });
        if (!userFound) return null;
        return this.toDomain(userFound);
    }

    async findAll() {
        return UserSchema.find();
    }

    async findByUsername(username: UsernameVO): Promise<UserModel | null> {
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

    //todo i don't now is good
    async following(userId: UuidVO, followingId: UuidVO): Promise<void> {
        /* los que yo sigo */
        const user = await UserSchema.findById(userId.value);
        if (!user) return;
        user.followingIds?.push(followingId.value);
        await user.save();
    }

    /**
     * A function that allows you to follow a user.
     * @param {UuidVO} userId - UuidVO, followingId: UuidVO
     * @param {UuidVO} followingId - UuidVO
     * @returns A promise of void
     */
    async follower(userId: UuidVO, followerId: UuidVO): Promise<void> {
        /* mis seguidores */
        const userFollow = await UserSchema.findById(userId.value);
        if (!userFollow) return;
        if (userFollow.followingIds?.includes(followerId.value)) {
            /* remove followinId in my profile */
            userFollow.followingIds = userFollow.followingIds.filter(
                follow => follow !== userId.value
            );
        } else {
            /* add followinId in my profile */
            userFollow.followingIds?.push(userId.value);
        }
    }

    async unfollow(userId: UuidVO, followingId: UuidVO): Promise<void> {
        const user = await UserSchema.findById(userId.value);
        if (!user) return;
        user.followingIds = user.followingIds?.filter(
            follow => follow !== userId.value
        );
        await user.save();
    }
}
