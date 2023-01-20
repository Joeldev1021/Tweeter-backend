import { inject, injectable } from 'inversify';
import { TYPES } from '../../../../types';
import { UuidVO } from '../../../../shared/domain/value-objects/uuid.vo';
import { ITweetRepository } from '../../../../tweet/domain/repository/tweet.respository';
import { IBookMarkRepository } from '../../../../tweet/domain/repository/book.mark.repository';
import { IReplyRepository } from '../../../../reply/domain/repository/reply.repository';
import { TweetModel } from '../../../../tweet/domain/models/tweet.model';
import { ReplyModel } from '../../../../reply/domain/model/reply.model';

interface TypeModel {
    type: string;
    model: TweetModel | ReplyModel;
}

@injectable()
export class BookMarkSaveUseCase {
    constructor(
        @inject(TYPES.TweetRepository)
        private readonly _tweetRepository: ITweetRepository,
        @inject(TYPES.BookMarkRepository)
        private readonly _booMarkRepository: IBookMarkRepository,
        @inject(TYPES.ReplyRepository)
        private readonly _replyRepository: IReplyRepository
    ) {}

    public async execute(userId: UuidVO, id: UuidVO): Promise<void> {
        const foundModel = await this.findTypeModel(id);
        if (!foundModel) throw new Error('model not found');

        await this._booMarkRepository.save(userId, id, foundModel.type);
    }

    private async findTypeModel(tweetId: UuidVO): Promise<TypeModel | null> {
        const tweetFound = await this._tweetRepository.findById(tweetId);
        if (tweetFound)
            return {
                type: 'tweet',
                model: tweetFound,
            };
        const replyFound = await this._replyRepository.findById(tweetId);
        if (replyFound) {
            return {
                type: 'reply',
                model: replyFound,
            };
        } else return null;
    }
}
