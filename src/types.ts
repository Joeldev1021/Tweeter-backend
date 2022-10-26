
const UseCases = {
    UserRegisterUseCase: Symbol.for("UserRegisterUseCase"),
    UserLoginUseCase: Symbol.for("UserLoginUseCase"),
    TweetCreateUseCase: Symbol.for("TweetCreateUseCase"),
    TweetFindAllUseCase: Symbol.for("TweetFindAllUseCase"),
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


