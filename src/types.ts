
const UseCases = {
    UserRegisterUseCase: Symbol.for("UserRegisterUseCase"),
    UserLoginUseCase: Symbol.for("UserLoginUseCase"),
    UserProfileUseCase: Symbol.for("UserProfileUseCase"),

    TweetCreateUseCase: Symbol.for("TweetCreateUseCase"),
    TweetFindAllUseCase: Symbol.for("TweetFindAllUseCase"),
    TweetFindByIdUseCase: Symbol.for("TweetFindByIdUseCase"),
    TweetFindByOwnerIdUseCase: Symbol.for("TweetFindByOwnerIdUseCase"),
    TweetUpdateByIdUseCase: Symbol.for("TweetUpdateByIdUseCase"),
    TweetDeleteByIdUseCase: Symbol.for("TweetDeleteByIdUseCase"),

    ReplyCreateUseCase: Symbol.for("ReplyCreateUseCase"),
    ReplyFindAllUseCase: Symbol.for("ReplyFindAllUseCase"),
    ReplyFindByIdUseCase: Symbol.for("ReplyFindByIdUseCase"),
    ReplyDeleteByIdUseCase: Symbol.for("ReplyDeleteByIdUseCase"),


}

const Repositories = {
    UserRepository: Symbol.for("UserRepository"),
    TweetRepository: Symbol.for("TweetRepository"),
    ReplyRepository: Symbol.for("ReplyRepository")
}

const Middlewares = {
    AuthMiddleware: Symbol.for("AuthMiddleware"),
}

const Services = {
    JwtService: Symbol.for("JwtService"),
}


const TYPES = {
    ...UseCases,
    ...Repositories,
    ...Middlewares,
    ...Services
}

export { TYPES }


