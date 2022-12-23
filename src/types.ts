const UseCases = {
    UserRegisterUseCase: Symbol.for('UserRegisterUseCase'),
    UserLoginUseCase: Symbol.for('UserLoginUseCase'),
    UserProfileUseCase: Symbol.for('UserProfileUseCase'),
    UserFollowerUseCase: Symbol.for('UserFollowerUseCase'),
    UserFollowingUseCase: Symbol.for('UserFollowingUseCase'),
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
    ReplyFindByParentReplyIdUseCase: Symbol.for(
        'ReplyFindByParentReplyIdUseCase'
    ),
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

const EventHandler = {
    TweetCreatedHandler: Symbol.for('TweetCreatedHandler'),
    ReplyCreatedHandler: Symbol.for('ReplyCreatedHandler'),
};

const EventBus = Symbol.for('EventBus');

const TYPES = {
    ...UseCases,
    ...Repositories,
    ...Middlewares,
    ...Services,
    ...EventHandler,
    EventBus,
};

enum coreTypes {
    EventBus = 'EventBus',
    EventHandler = 'EventHandler',
}

export { TYPES, coreTypes };
