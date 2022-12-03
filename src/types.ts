const UseCases = {
    UserRegisterUseCase: Symbol.for('UserRegisterUseCase'),
    UserLoginUseCase: Symbol.for('UserLoginUseCase'),
    UserProfileUseCase: Symbol.for('UserProfileUseCase'),
    ProfileFindByQueryFilterUseCase: Symbol.for(
        'ProfileFindByQueryFilterUseCase'
    ),

    TweetCreateUseCase: Symbol.for('TweetCreateUseCase'),
    TweetFindAllUseCase: Symbol.for('TweetFindAllUseCase'),
    TweetFindByIdUseCase: Symbol.for('TweetFindByIdUseCase'),
    TweetFindByOwnerIdUseCase: Symbol.for('TweetFindByOwnerIdUseCase'),
    TweetUpdateByIdUseCase: Symbol.for('TweetUpdateByIdUseCase'),
    TweetDeleteByIdUseCase: Symbol.for('TweetDeleteByIdUseCase'),
    TweetLikeUseCase: Symbol.for('TweetLikeUseCase'),

    ReplyCreateUseCase: Symbol.for('ReplyCreateUseCase'),
    ReplyFindAllUseCase: Symbol.for('ReplyFindAllUseCase'),
    ReplyFindByIdUseCase: Symbol.for('ReplyFindByIdUseCase'),
    ReplyFindByTweetIdUseCase: Symbol.for('ReplyFindByTweetIdUseCase'),
    ReplyDeleteByIdUseCase: Symbol.for('ReplyDeleteByIdUseCase'),
    ReplyFindByOwnerIdUseCase: Symbol.for('ReplyFindByOwnerIdUseCase'),
    ReplyLikeUseCase: Symbol.for('ReplyLikeUseCase'),

    ReplyCreateToReplyUseCase: Symbol.for('ReplyCreateToReplyUseCase'),
};

const Repositories = {
    UserRepository: Symbol.for('UserRepository'),
    TweetRepository: Symbol.for('TweetRepository'),
    ReplyRepository: Symbol.for('ReplyRepository'),
};

const Middlewares = {
    AuthMiddleware: Symbol.for('AuthMiddleware'),
};

const Services = {
    JwtService: Symbol.for('JwtService'),
};

const TYPES = {
    ...UseCases,
    ...Repositories,
    ...Middlewares,
    ...Services,
};

export { TYPES };
