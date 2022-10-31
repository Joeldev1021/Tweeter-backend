
const UseCases = {
    UserRegisterUseCase: Symbol.for("UserRegisterUseCase"),
    UserLoginUseCase: Symbol.for("UserLoginUseCase"),
    UserProfileUseCase: Symbol.for("UserProfileUseCase"),
    TweetCreateUseCase: Symbol.for("TweetCreateUseCase"),
    TweetFindAllUseCase: Symbol.for("TweetFindAllUseCase"),
    TweetFindByIdUseCase: Symbol.for("TweetFindByIdUseCase"),
    TweetUpdateByIdUseCase: Symbol.for("TweetUpdateByIdUseCase"),
    TweetDeleteByIdUseCase: Symbol.for("TweetDeleteByIdUseCase"),

}

const Repositories = {
    UserRepository: Symbol.for("UserRepository"),
    TweetRepository: Symbol.for("TweetRepository")
}

const Middleware = {
    AuthMiddleware: Symbol.for("AuthMiddleware"),
}


const TYPES = {
    ...UseCases,
    ...Repositories,
    ...Middleware,
}

export { TYPES }


