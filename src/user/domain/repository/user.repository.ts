import { UsernameVO } from '../value-objects/username.vo';
import { UserModel } from '../models/user.model';
import { EmailVO } from '../value-objects/email.vo';
import { UuidVO } from '../../../shared/domain/value-objects/uuid.vo';

export interface IUserRepository {
    /**
     * It finds a user by id.
     * @param {UuidVO} id - UuidVO
     * @returns A {UserModel}
     */
    findById(id: UuidVO): Promise<UserModel | null>;

    /**
     * It finds a user by email and returns a domain object
     * @param {EmailVO} email - EmailVO
     * @returns A UserModel ornull
     */
    findByEmail(email: EmailVO): Promise<UserModel | null>;

    /**
     * It takes a user object, converts it to a user persistance object, creates a new user schema
     * object, and then converts it back to a user object
     * @param {UserModel} user - UserModel - this is the user object that we are passing in.
     * @returns The user is being returned.
     */
    create(user: UserModel): Promise<UserModel | null>;

    /**
     * It finds a user by username and returns a domain object
     * @param {UsernameVO} username - UsernameVO
     * @returns A UserModel ornull
     */
    findByUsername(username: UsernameVO): Promise<UserModel | null>;

    update(user: UserModel): Promise<void>;

    follower(userId: UuidVO, followerId: UuidVO): Promise<void>;

    following(userId: UuidVO, followingId: UuidVO): Promise<void>;
}
