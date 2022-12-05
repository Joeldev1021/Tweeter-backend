import { inject, injectable } from 'inversify';
import { TweetWithUserModel } from '../../../tweet/domain/models/tweet.model';
import { UuidVO } from '../../../shared/domain/value-objects/uuid.vo';
import { QueryFilterVO } from '../../../shared/domain/value-objects/query-filter.vo';

@injectable()
export class UserSearchProfileUseCase {
    constructor() {}

    public async execute(
        userId: UuidVO,
        query: QueryFilterVO
    ): Promise<TweetWithUserModel[] | null> {
        return null;
    }
}
