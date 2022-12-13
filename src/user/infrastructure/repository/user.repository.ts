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
        const { _id, username, email, password, tweetIds, followerIds } =
            persistanceUser;
        return new UserModel(
            new UuidVO(_id),
            new UsernameVO(username),
            new EmailVO(email),
            new PasswordVO(password),
            tweetIds ? tweetIds.map(tweetId => new UuidVO(tweetId)) : [],
            followerIds ? followerIds.map(follower => new UuidVO(follower)) : []
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
        };
    }

    async create(userModel: UserModel): Promise<UserModel | null> {
        const userPersistance = this.toPersistance(userModel);
        const user = new UserSchema(userPersistance);
        const userSave = await user.save();
        return this.toDomain(userSave);
    }

    async findById(id: UuidVO): Promise<UserModel | null> {
        const userFound = await UserSchema.findById(id.value);
        if (!userFound) return null;
        const userDomain = this.toDomain(userFound);
        return userDomain;
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

    async follower(userId: UuidVO, followerId: UuidVO): Promise<void> {
        const user = await UserSchema.findById(followerId.value);
        if (!user) return;
        if (user.followerIds?.includes(userId.value)) {
            user.followerIds = user.followerIds.filter(
                follow => follow !== userId.value
            );
        } else {
            user.followerIds?.push(userId.value);
        }
    }
}
