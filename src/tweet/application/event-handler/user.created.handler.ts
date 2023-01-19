import { inject, injectable } from 'inversify';
import { UserCreatedEvent } from '../../../shared/domain/events/user/user.created.event';
import { IDomainEventClass } from '../../../shared/domain/types/domain-event-class';
import { EventHandler } from '../../../shared/domain/types/event-handler.interface';
import { UuidVO } from '../../../shared/domain/value-objects/uuid.vo';
import { TYPES } from '../../../types';
import { BookMarkModel } from '../../../user/domain/models/bookmark.model';
import { BookMarkRepository } from '../../infrastruture/repository/book.mark.repository';
import uuid from 'uuid-random';
import { BookMarkIdAlreadyExistException } from '../errors/book.mark.id.already.exist.exception';

@injectable()
export class UserCreatedHandler implements EventHandler {
    private readonly _bookMarkRepository: BookMarkRepository;
    constructor(
        @inject(TYPES.BookMarkRepository)
        bookMarkRepository: BookMarkRepository
    ) {
        this._bookMarkRepository = bookMarkRepository;
    }

    subscribedTo(): IDomainEventClass[] {
        return [UserCreatedEvent];
    }

    async handle(event: UserCreatedEvent): Promise<void> {
        const { userId } = event.payload;
        const onwerId = new UuidVO(userId);
        const bookMarkFound = await this._bookMarkRepository.findByOwnerId(
            onwerId
        );
        if (bookMarkFound) throw new BookMarkIdAlreadyExistException();

        await this._bookMarkRepository.create(
            new BookMarkModel(new UuidVO(uuid()), onwerId, [], [])
        );
    }
}
