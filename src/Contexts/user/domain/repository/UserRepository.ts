import { UserId } from '../../../shared/domain/valueObjects/UserId';
import { UserModel } from '../models/UserModel';
import { UserEmail } from '../value-objects/UserEmail';
import { UserUsername } from '../value-objects/UserUsername';

export interface UserRepository {
    /**
     * It finds a user by id.
     * @param {UserId} id -UserId
     * @returns A {UserModel}
     */
    findById(id: UserId): Promise<UserModel | null>;

    /**
     * It finds a user by email and returns a domain object
     * @param {UserEmail} email -UserEmail
     * @returns A UserModel ornull
     */
    findByEmail(email: UserEmail): Promise<UserModel | null>;

    /**
     * It takes a user object, converts it to a user persistance object, creates a new user schema
     * object, and then converts it back to a user object
     * @param {UserModel} user - UserModel - this is the user object that we are passing in.
     * @returns The user is being returned.
     */
    create(user: UserModel): Promise<UserModel | null>;

    /**
     * It finds a user by username and returns a domain object
     * @param {UserUsername} username -UserUsername * @returns A UserModel ornull
     */
    findByUsername(username: UserUsername): Promise<UserModel | null>;
    /**
     * It updates the user in the database.
     * @param {UserModel} user - UserModel - the user object to be updated
     */
    update(user: UserModel): Promise<void>;
    /**
     * Add the followingId to the user's followingIds array.
     * @param {UserId} userId -UserId
     * @param {UserId} followingId -UserId
     * @returns A promise of void
     */
    following(userId: UserId, followingId: UserId): Promise<void>;

    /**
     * It finds a user by id, removes the user id from the user's followingIds array, and saves the user
     * @param {UserId} userId - UserId - The userId of the user who is following
     * @param {UserId} followingId - The userId of the user you want to unfollow.
     * @returns A promise that resolves to void
     */
    unfollow(userId: UserId, followingId: UserId): Promise<void>;
}
