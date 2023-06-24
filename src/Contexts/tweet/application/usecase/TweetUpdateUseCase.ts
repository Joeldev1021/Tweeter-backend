import { AppplicationUnauthorizedException } from '../../../shared/application/errors/application.unauthorized.exception';
import { inject, injectable } from 'inversify';
import { TweetModel } from '../../domain/models/tweet.model';
import { TweetRepository } from '../../infrastruture/repository/tweet.repository';
import { TYPES } from '../../../types';
import { UuidVO } from '../../../shared/domain/value-objects/Uuid';
import { ContentVO } from '../../../shared/domain/value-objects/ContentValueObject';
import { TweetNotFoundException } from '../errors/tweet.not.found.exception';

@injectable()
export class TweetUpdateByIdUseCase {
    private readonly tweetRepository: TweetRepository;
    constructor(
        @inject(TYPES.TweetRepository) tweetRepository: TweetRepository
    ) {
        this.tweetRepository = tweetRepository;
    }

    public async execute(
        id: UuidVO,
        content: ContentVO,
        onwerId: UuidVO
    ): Promise<TweetModel | null> {
        const tweetFound = await this.tweetRepository.findById(id);
        if (!tweetFound) throw new TweetNotFoundException();

        if (tweetFound.ownerId.value !== onwerId.value)
            throw new AppplicationUnauthorizedException();
        //const tweetUpdate = { ...tweetFound, content: content };
        const tweetUpdate = new TweetModel(
            id,
            content,
            onwerId,
            tweetFound.image,
            tweetFound.likes,
            tweetFound.reply,
            tweetFound.createdAt
        );

        return await this.tweetRepository.update(id, tweetUpdate);
    }
}
