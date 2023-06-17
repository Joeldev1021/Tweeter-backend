import { inject, injectable } from 'inversify';
import { ReplyModel } from '../../../domain/model/reply.model';
import { ReplyRepository } from '../../../infrastructure/repository/reply.repository';
import { TweetRepository } from '../../../../tweet/infrastruture/repository/tweet.repository';
import { TYPES } from '../../../../types';
import { TweetNotFoundException } from '../../../../tweet/application/errors/tweet.not.found.exception';
import { UuidVO } from '../../../../shared/domain/value-objects/uuid.vo';
import { ContentVO } from '../../../../shared/domain/value-objects/content.vo';
import { CreatedAtVO } from '../../../../shared/domain/value-objects/created-at.vo';

@injectable()
export class ReplyCreateToReplyUseCase {
    private tweetRepository: TweetRepository;
    private replyRepository: ReplyRepository;
    constructor(
        @inject(TYPES.TweetRepository) tweetRepository: TweetRepository,
        @inject(TYPES.ReplyRepository) replyRepository: ReplyRepository
    ) {
        this.tweetRepository = tweetRepository;
        this.replyRepository = replyRepository;
    }

    public async execute(
        id: UuidVO,
        content: ContentVO,
        tweeId: UuidVO,
        ownerId: UuidVO,
        parentReply: UuidVO
    ): Promise<ReplyModel | null> {
        const foundTweet = await this.tweetRepository.findById(tweeId);
        if (!foundTweet) throw new TweetNotFoundException();

        const foundReply = await this.replyRepository.findById(parentReply);
        if (!foundReply) throw new TweetNotFoundException();
        return this.replyRepository.create(
            new ReplyModel(
                id,
                content,
                tweeId,
                ownerId,
                parentReply, //parent reply
                [], //likes
                [], //replys
                new CreatedAtVO(new Date())
            )
        );
    }
}
