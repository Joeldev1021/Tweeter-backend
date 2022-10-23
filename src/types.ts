const UseCases = {
    UserRegisterUseCase: Symbol.for("UserRegisterUseCase"),
    UserLoginUseCase: Symbol.for("UserLoginUseCase"),
}

const Repositories = {
    UserRepository: Symbol.for("UserRepository")
}


const TYPES = {
    ...UseCases,
    ...Repositories,
}

export { TYPES }


