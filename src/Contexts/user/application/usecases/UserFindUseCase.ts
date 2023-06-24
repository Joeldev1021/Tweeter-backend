import { inject, injectable } from 'inversify';
import { TweetWithUserModel } from '../../../tweet/domain/models/tweet.model';
import { UuidVO } from '../../../shared/domain/value-objects/Uuid';
import { QueryFilterVO } from '../../../shared/domain/value-objects/QueryFilterValueObject';

@injectable()
export class UserFindUseCase {
    constructor() {}

    public async execute(
        userId: UuidVO,
        query: QueryFilterVO
    ): Promise<TweetWithUserModel[] | null> {
        return null;
    }
}
