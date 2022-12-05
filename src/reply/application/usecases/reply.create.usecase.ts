import { inject, injectable } from 'inversify';
import { ReplyModel } from '../../domain/model/reply.model';
import { ReplyRepository } from '../../infrastructure/repository/reply.repository';
import { TweetRepository } from '../../../tweet/infrastruture/repository/tweet.repository';
import { TYPES } from '../../../types';
import { TweetNotFoundException } from '../../../tweet/application/errors/tweet.not.found.exception';
import { UuidVO } from '../../../shared/domain/value-objects/uuid.vo';
import { ContentVO } from '../../../shared/domain/value-objects/content.vo';
import { CreatedAtVO } from '../../../shared/domain/value-objects/created-at.vo';
import { IEventBus } from '../../../shared/domain/events/event-bus.interface';

@injectable()
export class ReplyCreateUseCase {
    constructor(
        @inject(TYPES.ReplyRepository)
        private _replyRepository: ReplyRepository,
        @inject(TYPES.EventBus)
        private _eventBust: IEventBus
    ) {}

    public async execute(
        id: UuidVO,
        content: ContentVO,
        tweeId: UuidVO,
        ownerId: UuidVO
    ): Promise<ReplyModel | null> {
        const reply = ReplyModel.create(id, content, tweeId, ownerId);

        return this._replyRepository.create(reply);

        this._eventBust.publishMany(reply.getEvents());

        return reply;
    }
}
