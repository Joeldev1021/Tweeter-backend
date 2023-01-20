import { UuidVO } from '../../../shared/domain/value-objects/uuid.vo';
import { IReplyRepository } from '../../../reply/domain/repository/reply.repository';
import { ITweetRepository } from '../../../tweet/domain/repository/tweet.respository';
import { inject, injectable } from 'inversify';
import { TYPES } from '../../../types';

export interface TypeModel {
    type: string;
}

@injectable()
export class BookmarkVerifyTypeService {
    constructor(
        @inject(TYPES.TweetRepository)
        private readonly _tweetRepository: ITweetRepository,

        @inject(TYPES.ReplyRepository)
        private readonly _replyRepository: IReplyRepository
    ) {}

    async execute(id: UuidVO): Promise<TypeModel | null> {
        const tweetFound = await this._tweetRepository.findById(id);
        if (tweetFound)
            return {
                type: 'tweet',
            };
        const replyFound = await this._replyRepository.findById(id);
        if (replyFound) {
            return {
                type: 'reply',
            };
        } else return null;
    }
}
