import { inject, injectable } from 'inversify';
import { TweetRepository } from '../../../tweet/infrastruture/repository/tweet.repository';
import { TweetWithUserModel } from '../../../tweet/domain/models/tweet.model';
import { ReplyRepository } from '../../../reply/infrastructure/repository/reply.repository';
import { ReplyWithUserModel } from '../../../reply/domain/model/reply.model';
import { UuidVO } from '../../../shared/domain/value-objects/Uuid';
import { QueryFilterVO } from '../../../shared/domain/value-objects/QueryFilterValueObject';
import { TYPES } from '../../../types';

interface UserByFilter {
    data: TweetWithUserModel[] | ReplyWithUserModel[];
}

@injectable()
export class ProfileFindByQueryFilterUseCase {
    private readonly tweetRepository: TweetRepository;
    private readonly replyRepository: ReplyRepository;

    constructor(
        @inject(TYPES.TweetRepository) tweetRepository: TweetRepository,
        @inject(TYPES.ReplyRepository) replyRepository: ReplyRepository
    ) {
        this.tweetRepository = tweetRepository;
        this.replyRepository = replyRepository;
    }

    public async execute(
        userId: UuidVO,
        query: QueryFilterVO
    ): Promise<TweetWithUserModel[] | null> {
        return null;
    }
}
