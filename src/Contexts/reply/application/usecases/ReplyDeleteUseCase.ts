import { inject, injectable } from 'inversify';
import { UnauthorizedException } from '../../../shared/application/errors/application.unauthorized.exception';
import { UuidVO } from '../../../shared/domain/value-objects/Uuid';
import { TweetNotFoundException } from '../../../tweet/application/errors/tweet.not.found.exception';
import { TYPES } from '../../../types';
import { ReplyModel } from '../../domain/model/reply.model';
import { ReplyRepository } from '../../infrastructure/repository/reply.repository';

@injectable()
export class ReplyDeleteByIdUseCase {
    private readonly replyRepository: ReplyRepository;
    constructor(
        @inject(TYPES.ReplyRepository) replyRepository: ReplyRepository
    ) {
        this.replyRepository = replyRepository;
    }

    public async execute(
        id: UuidVO,
        ownerId: UuidVO
    ): Promise<ReplyModel | null> {
        const foundReply = await this.replyRepository.findById(id);
        if (!foundReply) throw new TweetNotFoundException();

        if (foundReply.ownerId.value !== ownerId.value)
            throw new AppplicationUnauthorizedException();

        return await this.replyRepository.delete(id);
    }
}
