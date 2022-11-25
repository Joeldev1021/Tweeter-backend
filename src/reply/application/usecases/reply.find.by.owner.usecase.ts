import { inject, injectable } from 'inversify';
import { UuidVO } from '../../../shared/domain/value-objects/uuid.vo';
import { TweetNotFoundException } from '../../../tweet/application/errors/tweet.not.found.exception';
import { TYPES } from '../../../types';
import { ReplyModel } from '../../domain/model/reply.model';
import { ReplyRepository } from '../../infrastructure/repository/reply.repository';

@injectable()
export class ReplyFindByOwnerIdUseCase {
    private replyRepository: ReplyRepository;
    constructor(
        @inject(TYPES.ReplyRepository) replyRepository: ReplyRepository
    ) {
        this.replyRepository = replyRepository;
    }

    public async execute(ownerId: UuidVO): Promise<ReplyModel[] | null> {
        const replyFound = await this.replyRepository.findByOwnerId(ownerId);
        if (!replyFound) throw new TweetNotFoundException();

        return replyFound;
    }
}
