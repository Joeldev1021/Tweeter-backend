import { injectable } from 'inversify';
import { UuidVO } from '../../../shared/domain/value-objects/uuid.vo';
import { BookMarkModel } from '../../../user/domain/models/bookmark.model';
import { IBookMarkRepository } from '../../domain/repository/book.mark.repository';
import { IBookMark } from '../../../user/infrastructure/interface/save.tweet.interface';
import { BookMarkSchema } from '../schemas/book.mark.schema';
import { UserModel } from '../../../user/domain/models/user.model';

@injectable()
export class BookMarkRepository implements IBookMarkRepository {
    toPersistance(booKMark: BookMarkModel): IBookMark {
        const { id, ownerId, tweetIds, replyIds } = booKMark;
        return {
            _id: id.value,
            ownerId: ownerId.value,
            tweetIds: tweetIds ? tweetIds.map(tweet => tweet.value) : [],
            replyIds: replyIds ? replyIds.map(tweet => tweet.value) : [],
        };
    }

    async save(userId: UuidVO, tweetId: UuidVO): Promise<void> {
        const bookMark = await BookMarkSchema.findOne({
            ownerId: userId.value,
        });
        bookMark?.tweetIds?.push(tweetId.value);
        await bookMark?.save();
    }

    async findByOwnerId(ownerId: UuidVO): Promise<IBookMark | null> {
        return await BookMarkSchema.findOne({ ownerId: ownerId.value });
    }

    async create(bookMarkModel: BookMarkModel): Promise<void> {
        const bookMark = this.toPersistance(bookMarkModel);
        const bookMarkCreated = await new BookMarkSchema(bookMark);
        await bookMarkCreated.save();
    }

    async findById(id: UuidVO): Promise<BookMarkModel | null> {
        return null;
    }

    async remove(userId: UuidVO, tweetId: UuidVO): Promise<void> {}

    async update(user: BookMarkModel): Promise<void> {}
}
