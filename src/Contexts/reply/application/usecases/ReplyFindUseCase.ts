import { inject, injectable } from 'inversify';
import { UuidVO } from '../../../shared/domain/valueObjects/Uuid';
import { TweetNotFoundException } from '../../../tweet/application/errors/tweet.not.found.exception';
import { TYPES } from '../../../types';
import { ReplyModel } from '../../domain/model/reply.model';
import { ReplyRepository } from '../../infrastructure/repository/reply.repository';

@injectable()
export class ReplyFindUseCase {
    private readonly replyRepository: ReplyRepository;
    constructor(
        @inject(TYPES.ReplyRepository) replyRepository: ReplyRepository
    ) {
        this.replyRepository = replyRepository;
    }

    public async execute(id: UuidVO): Promise<ReplyModel | null> {
        const replyFound = await this.replyRepository.findById(id);
        if (!replyFound) throw new TweetNotFoundException();

        return replyFound;
    }
}
