import { inject, injectable } from 'inversify';
import { ReplyModel } from '../../domain/model/reply.model';
import { ReplyRepository } from '../../infrastructure/repository/reply.repository';
import { TYPES } from '../../../types';
import { UuidVO } from '../../../shared/domain/value-objects/Uuid';
import { ContentVO } from '../../../shared/domain/value-objects/ContentValueObject';
import { IEventBus } from '../../../shared/domain/types/event-bus.interface';
@injectable()
export class ReplyCreateUseCase {
    constructor(
        @inject(TYPES.ReplyRepository)
        private readonly _replyRepository: ReplyRepository,
        @inject(TYPES.EventBus)
        private readonly _eventBus: IEventBus
    ) {}

    public async execute(
        id: UuidVO,
        content: ContentVO,
        tweeId: UuidVO,
        ownerId: UuidVO
    ): Promise<ReplyModel | null> {
        const reply = ReplyModel.create(id, content, tweeId, ownerId);

        const replySave = await this._replyRepository.create(reply);

        this._eventBus.publish(reply.pullDomainEvents());

        return replySave;
    }
}
