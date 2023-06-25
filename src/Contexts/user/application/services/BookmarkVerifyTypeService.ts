import { inject, injectable } from 'inversify';
import { TYPES } from '../../../../apps/backend/dependency-injection/Types';
import { TweetRepository } from '../../../tweet/domain/repository/TweetRepository';
import { ReplyRepository } from '../../../reply/infrastructure/repository/ReplyMongoRepository';
import { Uuid } from '../../../shared/domain/valueObjects/Uuid';

export interface TypeModel {
    type: string;
}

@injectable()
export class BookmarkVerifyTypeService {
    constructor(
        @inject(TYPES.TweetRepository)
        private readonly _tweetRepository: TweetRepository,

        @inject(TYPES.ReplyRepository)
        private readonly _replyRepository: ReplyRepository
    ) {}

    async execute(id: Uuid): Promise<TypeModel | null> {
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
