import { Container } from 'inversify'
import { TYPES } from './types';

import { UserLoginUseCase } from './application/use-cases/auth/user.login.usecase';
import { UserProfileUseCase } from './application/use-cases/profile/user.profile.usecase';
import { UserRegisterUseCase } from './application/use-cases/auth/user.register.usecase';
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
import { ReplyCreateUseCase } from './application/use-cases/reply/reply.create.usecase';
import { IReplyRepository } from './domain/repository/reply.repository';
import { ReplyRepository } from './infrastruture/repositories/reply.repository';
import { JwtService } from './infrastruture/services/jwt.services';
import { TweetFindByOwnerIdUseCase } from './application/use-cases/tweet/tweet.find.by.id.owner';
import { TweetLikeUseCase } from './application/use-cases/tweet/tweet.like.usecase';
import { ReplyFindByIdUseCase } from './application/use-cases/reply/reply.find.by.id.usecase';
import { ReplyDeleteByIdUseCase } from './application/use-cases/reply/reply.delete.usecase';
import { ReplyFindByOwnerIdUseCase } from './application/use-cases/reply/reply.find.by.owner.usecase';
import { ReplyLikeUseCase } from './application/use-cases/reply/reply.like.usecase';
import { ProfileFindByQueryFilterUseCase } from './application/use-cases/profile/profile.find.query.filter.usecase';
import { ReplyFindByTweetIdUseCase } from './application/use-cases/reply/reply.find.by.tweet.usecase';

const container = new Container();

/* ========== repository =========== */
container.bind<IUserRepository>(TYPES.UserRepository).to(UserRepository)
container.bind<ITweetRepository>(TYPES.TweetRepository).to(TweetRepository)
container.bind<IReplyRepository>(TYPES.ReplyRepository).to(ReplyRepository)

/* ========== user usecase =========== */
container.bind<UserRegisterUseCase>(TYPES.UserRegisterUseCase).to(UserRegisterUseCase)
container.bind<UserLoginUseCase>(TYPES.UserLoginUseCase).to(UserLoginUseCase)
container.bind<UserProfileUseCase>(TYPES.UserProfileUseCase).to(UserProfileUseCase)
container.bind<ProfileFindByQueryFilterUseCase>(TYPES.ProfileFindByQueryFilterUseCase).to(ProfileFindByQueryFilterUseCase)

/* ========== tweet usecase =========== */
container.bind<TweetCreateUseCase>(TYPES.TweetCreateUseCase).to(TweetCreateUseCase)
container.bind<TweetFindAllUseCase>(TYPES.TweetFindAllUseCase).to(TweetFindAllUseCase)
container.bind<TweetFindByIdUseCase>(TYPES.TweetFindByIdUseCase).to(TweetFindByIdUseCase)
container.bind<TweetFindByOwnerIdUseCase>(TYPES.TweetFindByOwnerIdUseCase).to(TweetFindByOwnerIdUseCase)
container.bind<TweetUpdateByIdUseCase>(TYPES.TweetUpdateByIdUseCase).to(TweetUpdateByIdUseCase)
container.bind<TweetDeleteByIdUseCase>(TYPES.TweetDeleteByIdUseCase).to(TweetDeleteByIdUseCase)
container.bind<TweetLikeUseCase>(TYPES.TweetLikeUseCase).to(TweetLikeUseCase)

/* ========== reply usecase =========== */
container.bind<ReplyCreateUseCase>(TYPES.ReplyCreateUseCase).to(ReplyCreateUseCase)
/* container.bind<ReplyFindAllUseCase>(TYPES.ReplyFindAllUseCase).to(ReplyFindAllUseCase) */
container.bind<ReplyFindByIdUseCase>(TYPES.ReplyFindByIdUseCase).to(ReplyFindByIdUseCase)
container.bind<ReplyDeleteByIdUseCase>(TYPES.ReplyDeleteByIdUseCase).to(ReplyDeleteByIdUseCase)
container.bind<ReplyFindByOwnerIdUseCase>(TYPES.ReplyFindByOwnerIdUseCase).to(ReplyFindByOwnerIdUseCase)
container.bind<ReplyLikeUseCase>(TYPES.ReplyLikeUseCase).to(ReplyLikeUseCase)
container.bind<ReplyFindByTweetIdUseCase>(TYPES.ReplyFindByTweetIdUseCase).to(ReplyFindByTweetIdUseCase)

/* ========== middleware=========== */
container.bind<AuthMiddleware>(TYPES.AuthMiddleware).to(AuthMiddleware)
container.bind<JwtService>(TYPES.JwtService).to(JwtService)


export { container }