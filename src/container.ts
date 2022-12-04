import { Container } from 'inversify';
import { TYPES } from './types';

import { IUserRepository } from './user/domain/repository/user.repository';
import { AuthMiddleware } from './shared/infrastruture/middlewares/auth.middleware';
import { UserRepository } from './user/infrastructure/repository/user.repository';

import { ITweetRepository } from './tweet/domain/repository/tweet.respository';
import { TweetRepository } from './tweet/infrastruture/repository/tweet.repository';
import { ReplyCreateUseCase } from './reply/application/usecases/reply.create.usecase';
import { IReplyRepository } from './reply/domain/repository/reply.repository';
import { ReplyRepository } from './reply/infrastructure/repository/reply.repository';
import { JwtService } from './shared/infrastruture/services/jwt.services';
import { UserRegisterUseCase } from './user/application,/usecases/user.register.usecase';
import { UserLoginUseCase } from './user/application,/usecases/user.login.usecase';
import { UserProfileUseCase } from './user/application,/usecases/user.profile.usecase';
import { ProfileFindByQueryFilterUseCase } from './user/application,/usecases/user.profile.find.query.filter.usecase';
import { TweetCreateUseCase } from './tweet/application/usecase/tweet-create.usecase';
import { TweetFindAllUseCase } from './tweet/application/usecase/tweet.find.all.usecase';
import { TweetFindByOwnerIdUseCase } from './tweet/application/usecase/tweet.find.by.id.owner.usecase';
import { TweetUpdateByIdUseCase } from './tweet/application/usecase/tweet.update.usecase';
import { TweetDeleteByIdUseCase } from './tweet/application/usecase/tweet.delete.usecase';
import { TweetLikeUseCase } from './tweet/application/usecase/tweet.like.usecase';
import { ReplyFindByIdUseCase } from './reply/application/usecases/reply.find.by.id.usecase';
import { ReplyDeleteByIdUseCase } from './reply/application/usecases/reply.delete.usecase';
import { ReplyFindByOwnerIdUseCase } from './reply/application/usecases/reply.find.by.owner.usecase';
import { ReplyLikeUseCase } from './reply/application/usecases/reply.like.usecase';
import { ReplyFindByTweetIdUseCase } from './reply/application/usecases/reply.find.by.tweet.usecase';
import { TweetFindByIdUseCase } from './tweet/application/usecase/tweet.find.by.id.usecase';
import { ReplyCreateToReplyUseCase } from './reply/application/usecases/replyTo/reply.create.to.reply';
import { IEventBus } from './shared/domain/events/event-bus.interface';
import { EventBus } from './shared/infrastruture/event/event.bus';

const container = new Container();

/* ========== repository =========== */
container.bind<IUserRepository>(TYPES.UserRepository).to(UserRepository);
container.bind<ITweetRepository>(TYPES.TweetRepository).to(TweetRepository);
container.bind<IReplyRepository>(TYPES.ReplyRepository).to(ReplyRepository);

/* ========== user usecase =========== */
container
    .bind<UserRegisterUseCase>(TYPES.UserRegisterUseCase)
    .to(UserRegisterUseCase);
container.bind<UserLoginUseCase>(TYPES.UserLoginUseCase).to(UserLoginUseCase);
container
    .bind<UserProfileUseCase>(TYPES.UserProfileUseCase)
    .to(UserProfileUseCase);
container
    .bind<ProfileFindByQueryFilterUseCase>(
        TYPES.ProfileFindByQueryFilterUseCase
    )
    .to(ProfileFindByQueryFilterUseCase);

/* ========== tweet usecase =========== */
container
    .bind<TweetCreateUseCase>(TYPES.TweetCreateUseCase)
    .to(TweetCreateUseCase);
container
    .bind<TweetFindAllUseCase>(TYPES.TweetFindAllUseCase)
    .to(TweetFindAllUseCase);
container
    .bind<TweetFindByIdUseCase>(TYPES.TweetFindByIdUseCase)
    .to(TweetFindByIdUseCase);
container
    .bind<TweetFindByOwnerIdUseCase>(TYPES.TweetFindByOwnerIdUseCase)
    .to(TweetFindByOwnerIdUseCase);
container
    .bind<TweetUpdateByIdUseCase>(TYPES.TweetUpdateByIdUseCase)
    .to(TweetUpdateByIdUseCase);
container
    .bind<TweetDeleteByIdUseCase>(TYPES.TweetDeleteByIdUseCase)
    .to(TweetDeleteByIdUseCase);
container.bind<TweetLikeUseCase>(TYPES.TweetLikeUseCase).to(TweetLikeUseCase);

/* ========== reply usecase =========== */
container
    .bind<ReplyCreateUseCase>(TYPES.ReplyCreateUseCase)
    .to(ReplyCreateUseCase);
/* container.bind<ReplyFindAllUseCase>(TYPES.ReplyFindAllUseCase).to(ReplyFindAllUseCase) */
container
    .bind<ReplyFindByIdUseCase>(TYPES.ReplyFindByIdUseCase)
    .to(ReplyFindByIdUseCase);
container
    .bind<ReplyDeleteByIdUseCase>(TYPES.ReplyDeleteByIdUseCase)
    .to(ReplyDeleteByIdUseCase);
container
    .bind<ReplyFindByOwnerIdUseCase>(TYPES.ReplyFindByOwnerIdUseCase)
    .to(ReplyFindByOwnerIdUseCase);
container.bind<ReplyLikeUseCase>(TYPES.ReplyLikeUseCase).to(ReplyLikeUseCase);
container
    .bind<ReplyFindByTweetIdUseCase>(TYPES.ReplyFindByTweetIdUseCase)
    .to(ReplyFindByTweetIdUseCase);
container
    .bind<ReplyCreateToReplyUseCase>(TYPES.ReplyCreateToReplyUseCase)
    .to(ReplyCreateToReplyUseCase);

/* ========== middleware=========== */
container.bind<AuthMiddleware>(TYPES.AuthMiddleware).to(AuthMiddleware);
container.bind<JwtService>(TYPES.JwtService).to(JwtService);

/*======== event========  */

container.bind<IEventBus>(TYPES.EventBus).to(EventBus);

export { container };
