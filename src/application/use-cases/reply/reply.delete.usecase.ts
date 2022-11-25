import { inject, injectable } from 'inversify';
import { ReplyModel } from '../../../domain/models/reply.model';
import { UuidVO } from '../../../domain/value-objects/uuid.vo';
import { ReplyRepository } from '../../../infrastruture/repositories/reply.repository';
import { TYPES } from '../../../types';
import { AppplicationUnauthorizedException } from '../../errors/application.unauthorized.exception';
import { TweetNotFoundException } from '../../errors/tweeter/tweet.not.found.exception';

@injectable()
export class ReplyDeleteByIdUseCase {
  private replyRepository: ReplyRepository;
  constructor(@inject(TYPES.ReplyRepository) replyRepository: ReplyRepository) {
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

    return this.replyRepository.delete(id);
  }
}
