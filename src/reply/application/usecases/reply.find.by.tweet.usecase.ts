import { inject, injectable } from 'inversify';
import { UuidVO } from '../../../shared/domain/value-objects/uuid.vo';
import { TweetNotFoundException } from '../../../tweet/application/errors/tweet.not.found.exception';
import { TYPES } from '../../../types';
import { ReplyModel, ReplyWithUserModel } from '../../domain/model/reply.model';
import { ReplyRepository } from '../../infrastructure/repository/reply.repository';

@injectable()
export class ReplyFindByTweetIdUseCase {
    private replyRepository: ReplyRepository;
    constructor(
        @inject(TYPES.ReplyRepository) replyRepository: ReplyRepository
    ) {
        this.replyRepository = replyRepository;
    }

    public async execute(tweetId: UuidVO): Promise<ReplyWithUserModel[]> {
        const replyFound = await this.replyRepository.findByTweetId(tweetId);
        console.log(replyFound);
        if (!replyFound) throw new TweetNotFoundException();

        return replyFound;
    }
}
