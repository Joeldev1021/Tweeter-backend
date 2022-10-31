import { Container } from 'inversify'
import { UserLoginUseCase } from './application/use-cases/user.login.usecase';
import { UserProfileUseCase } from './application/use-cases/user.profile.usecase';
import { UserRegisterUseCase } from './application/use-cases/user.register.usecase';
import { IUserRepository } from './domain/repository/user.repository';
import { AuthMiddleware } from './infrastruture/middlewares/auth.middleware';
import { UserRepository } from './infrastruture/repositories/user.repository';

import { ITweetRepository } from './domain/repository/tweet.respository';
import { TweetRepository } from './infrastruture/repositories/tweet.repository';
import { TweetCreateUseCase } from './application/use-cases/tweet/tweet-create.usecase';
import { TweetDeleteByIdUseCase } from './application/use-cases/tweet/tweet.delete.usecase';
import { TweetFindAllUseCase } from './application/use-cases/tweet/tweet.find.all.usecase';
import { TweetFindByIdUseCase } from './application/use-cases/tweet/tweet.find.by.id.usecase';
import { TweetUpdateByIdUseCase } from './application/use-cases/tweet/tweet.update.usecase';
import { TYPES } from './types';

const container = new Container();

/* ========== repository =========== */
container.bind<IUserRepository>(TYPES.UserRepository).to(UserRepository)
container.bind<ITweetRepository>(TYPES.TweetRepository).to(TweetRepository)

/* ========== user usecase =========== */
container.bind<UserRegisterUseCase>(TYPES.UserRegisterUseCase).to(UserRegisterUseCase)
container.bind<UserLoginUseCase>(TYPES.UserLoginUseCase).to(UserLoginUseCase)
container.bind<UserProfileUseCase>(TYPES.UserProfileUseCase).to(UserProfileUseCase)

/* ========== tweet usecase =========== */
container.bind<TweetCreateUseCase>(TYPES.TweetCreateUseCase).to(TweetCreateUseCase)
container.bind<TweetFindAllUseCase>(TYPES.TweetFindAllUseCase).to(TweetFindAllUseCase)
container.bind<TweetFindByIdUseCase>(TYPES.TweetFindByIdUseCase).to(TweetFindByIdUseCase)
container.bind<TweetUpdateByIdUseCase>(TYPES.TweetUpdateByIdUseCase).to(TweetUpdateByIdUseCase)
container.bind<TweetDeleteByIdUseCase>(TYPES.TweetDeleteByIdUseCase).to(TweetDeleteByIdUseCase)


/* ========== middleware=========== */
container.bind<AuthMiddleware>(TYPES.AuthMiddleware).to(AuthMiddleware)

export { container }