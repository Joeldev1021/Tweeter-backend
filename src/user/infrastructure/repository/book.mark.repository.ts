import { injectable } from 'inversify';
import { UuidVO } from '../../../shared/domain/value-objects/uuid.vo';
import { BookMarkModel } from '../../domain/models/bookmark.model';
import { IBookMarkRepository } from '../../../tweet/domain/repository/book.mark.repository';
import { IBookMark } from '../interface/save.tweet.interface';
import { BookMarkSchema } from '../schemas/book.mark.schema';

@injectable()
export class BookMarkRepository implements IBookMarkRepository {
    /**
     * It takes a BookMarkModel and returns an IBookMark
     * @param {BookMarkModel} booKMark - BookMarkModel
     * @returns An object IBookMarm
     */
    toPersistance(booKMark: BookMarkModel): IBookMark {
        const { id, ownerId, tweetIds, replyIds } = booKMark;
        return {
            _id: id.value,
            ownerId: ownerId.value,
            tweetIds: tweetIds ? tweetIds.map(tweet => tweet.value) : [],
            replyIds: replyIds ? replyIds.map(tweet => tweet.value) : [],
        };
    }

    async save(userId: UuidVO, id: UuidVO, type: string): Promise<void> {
        const bookMark = await BookMarkSchema.findOne({
            ownerId: userId.value,
        });
        if (!bookMark) return;
        if (type === 'tweet') {
            if (!bookMark.tweetIds?.includes(id.value))
                bookMark.tweetIds?.push(id.value);
        }
        if (type === 'reply') {
            if (!bookMark.replyIds?.includes(id.value))
                bookMark.replyIds?.push(id.value);
        }

        await bookMark?.save();
    }

    async findByOwnerId(ownerId: UuidVO): Promise<IBookMark | null> {
        return await BookMarkSchema.findOne({ ownerId: ownerId.value });
    }

    async create(bookMarkModel: BookMarkModel): Promise<void> {
        const bookMark = this.toPersistance(bookMarkModel);
        const bookMarkCreated = new BookMarkSchema(bookMark);
        await bookMarkCreated.save();
    }

    async findById(id: UuidVO): Promise<BookMarkModel | null> {
        return null;
    }

    async remove(userId: UuidVO, tweetId: UuidVO): Promise<void> {
        const bookMark = await BookMarkSchema.findOne({
            ownerId: userId.value,
        });
        if (!bookMark) return;

        if (bookMark.tweetIds?.includes(tweetId.value))
            bookMark.tweetIds = bookMark?.tweetIds?.filter(
                tweet => tweet !== tweetId.value
            );

        await bookMark?.save();
    }

    async update(user: BookMarkModel): Promise<void> {}
}
