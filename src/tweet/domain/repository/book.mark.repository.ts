import { UserModel } from '../../../user/domain/models/user.model';
import { UuidVO } from '../../../shared/domain/value-objects/uuid.vo';
import { BookMarkModel } from '../../../user/domain/models/bookmark.model';
import { IBookMark } from '../../../user/infrastructure/interface/save.tweet.interface';

export interface IBookMarkRepository {
    /**
     * > This function returns a promise that resolves to a BookMarkModel or null
     * @param {UuidVO} id - UuidVO
     * @returns A Promise of a BookMarkModel or null.
     */
    findById(id: UuidVO): Promise<BookMarkModel | null>;
    /**
     * It takes a BookMarkModel, converts it to a BookMarkSchema, and saves it to the database
     * @param {BookMarkModel} bookMark - BookMarkModel - This is the model that we are going to save
     * to the database.
     */
    create(bookMark: BookMarkModel): Promise<void>;
    /**
     * It finds a bookMark by the userId, if it exists, it adds the tweetId to the bookMark's tweetIds
     * array, and then saves the bookMark
     * @param {UuidVO} userId - UuidVO, tweetId: UuidVO
     * @param {UuidVO} tweetId - UuidVO
     * @returns A promise that resolves to void
     */
    save(userId: UuidVO, tweetId: UuidVO): Promise<void>;

    update(user: BookMarkModel): Promise<void>;
    /**
     * It finds a bookmark by the userId, if it exists, it filters out the tweetId from the tweetIds
     * array
     * @param {UuidVO} userId - UuidVO - The user's id
     * @param {UuidVO} tweetId - UuidVO
     * @returns A promise of void
     */
    remove(userId: UuidVO, tweetId: UuidVO): Promise<void>;
    /**
     * "Find a BookMark by ownerId."
     *
     * The first line of the function is a comment. It's a good idea to add comments to your functions
     * @param {UuidVO} ownerId - UuidVO
     * @returns A BookMarkSchema object.
     */
    findByOwnerId(ownerId: UuidVO): Promise<IBookMark | null>;
}
