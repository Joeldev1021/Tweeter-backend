import { Container } from 'inversify'
import { TweetCreateUseCase } from './application/use-cases/tweet/tweet-create.usecase';
import { TweetFindAllUseCase } from './application/use-cases/tweet/tweet.find.all.usecase';
import { UserLoginUseCase } from './application/use-cases/user.login.usecase';
import { UserRegisterUseCase } from './application/use-cases/user.register.usecase';
import { ITweetRepository } from './domain/repository/tweet.respository';
import { IUserRepository } from './domain/repository/user.repository';
import { AuthMiddleware } from './infrastruture/middlewares/auth.middleware';
import { TweetRepository } from './infrastruture/repositories/tweet.repository';
import { UserRepository } from './infrastruture/repositories/user.repository'
import { TYPES } from './types';

const container = new Container();

container.bind<UserRegisterUseCase>(TYPES.UserRegisterUseCase).to(UserRegisterUseCase)
container.bind<UserLoginUseCase>(TYPES.UserLoginUseCase).to(UserLoginUseCase)
container.bind<IUserRepository>(TYPES.UserRepository).to(UserRepository)
container.bind<TweetCreateUseCase>(TYPES.TweetCreateUseCase).to(TweetCreateUseCase)
container.bind<ITweetRepository>(TYPES.TweetRepository).to(TweetRepository)

container.bind<AuthMiddleware>(TYPES.AuthMiddleware).to(AuthMiddleware)

container.bind<TweetFindAllUseCase>(TYPES.TweetFindAllUseCase).to(TweetFindAllUseCase)
export { container }