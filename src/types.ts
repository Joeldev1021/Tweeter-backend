const UseCases = {
    UserRegisterUseCase: Symbol.for('UserRegisterUseCase'),
    UserLoginUseCase: Symbol.for('UserLoginUseCase'),
    UserProfileUseCase: Symbol.for('UserProfileUseCase'),
    UserFollowingUseCase: Symbol.for('UserFollowingUseCase'),
    ProfileFindByQueryFilterUseCase: Symbol.for(
        'ProfileFindByQueryFilterUseCase'
    ),

    UserUnfollowUseCase: Symbol.for('UserUnfollowUseCase'),
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

    BookMarkSaveUseCase: Symbol.for('BookMarkSaveUseCase'),
    BookMarkRemoveUseCase: Symbol.for('BookMarkRemoveUseCase'),
};

const Repositories = {
    UserRepository: Symbol.for('UserRepository'),
    TweetRepository: Symbol.for('TweetRepository'),
    ReplyRepository: Symbol.for('ReplyRepository'),
    BookMarkRepository: Symbol.for('BookMarkRepository'),
};

const Middlewares = {
    AuthMiddleware: Symbol.for('AuthMiddleware'),
};

const Services = {
    JwtService: Symbol.for('JwtService'),
    BookmarkVerifyTypeService: Symbol.for('BookmarkVerifyTypeService'),
};

/* const EventHandler = {
    ReplyCreatedHandler: Symbol.for('ReplyCreatedHandler'),
    TweetCreatedHandler: Symbol.for('TweetCreatedHandler'),
    UserFollowingAfterHandler: Symbol.for('UserFollowingAfterHandler'),
    UserUnfollowHandler: Symbol.for('UserUnfollowHandler'),
};
 */
const EventBus = Symbol.for('EventBus');

const TYPES = {
    ...UseCases,
    ...Repositories,
    ...Middlewares,
    ...Services,
    EventBus,
};

enum coreTypes {
    EventBus = 'EventBus',
    EventHandler = 'EventHandler',
}

export { TYPES, coreTypes };
