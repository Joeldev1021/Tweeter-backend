import { UserModel } from '../../../user/domain/models/user.model';
import { UuidVO } from '../../../shared/domain/value-objects/uuid.vo';
import { BookMarkModel } from '../../../user/domain/models/bookmark.model';

export interface IBookMarkRepository {
    findById(id: UuidVO): Promise<BookMarkModel | null>;

    create(bookMark: BookMarkModel): Promise<void>;

    save(userId: UuidVO, tweetId: UuidVO): Promise<void>;

    update(user: BookMarkModel): Promise<void>;

    remove(userId: UuidVO, tweetId: UuidVO): Promise<void>;
}
