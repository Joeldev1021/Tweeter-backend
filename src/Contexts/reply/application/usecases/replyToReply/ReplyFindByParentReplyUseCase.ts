import { inject, injectable } from 'inversify';
import { UuidVO } from '../../../../shared/domain/valueObjects/Uuid';
import { TweetNotFoundException } from '../../../../tweet/application/errors/tweet.not.found.exception';
import { TYPES } from '../../../../types';
import {
    ReplyModel,
    ReplyWithUserModel,
} from '../../../domain/model/reply.model';
import { ReplyRepository } from '../../../infrastructure/repository/reply.repository';

@injectable()
export class ReplyFindByParentReplyIdUseCase {
    private readonly replyRepository: ReplyRepository;
    constructor(
        @inject(TYPES.ReplyRepository) replyRepository: ReplyRepository
    ) {
        this.replyRepository = replyRepository;
    }

    public async execute(id: UuidVO): Promise<ReplyWithUserModel[] | null> {
        const replyFound = await this.replyRepository.findByParentReplyId(id);
        if (!replyFound) throw new TweetNotFoundException();
        return replyFound;
    }
}
