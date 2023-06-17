import { Container } from 'inversify';
import { coreTypes, TYPES } from './types';
import { IUserRepository } from '../../../Contexts/user/domain/repository/user.repository';
import { AuthMiddleware } from '../../../Contexts/shared/infrastruture/middlewares/auth.middleware';
import { UserRepository } from '../../../Contexts/user/infrastructure/repository/user.repository';
import { ITweetRepository } from '../../../Contexts/tweet/domain/repository/tweet.respository';
import { TweetRepository } from '../../../Contexts/tweet/infrastruture/repository/tweet.repository';
import { ReplyCreateUseCase } from '../../../Contexts/reply/application/usecases/reply.create.usecase';
import { IReplyRepository } from '../../../Contexts/reply/domain/repository/reply.repository';
import { ReplyRepository } from '../../../Contexts/reply/infrastructure/repository/reply.repository';
import { JwtService } from '../../../Contexts/shared/infrastruture/services/jwt.services';
import { UserRegisterUseCase } from '../../../Contexts/user/application/usecases/user.register.usecase';
import { UserLoginUseCase } from '../../../Contexts/user/application/usecases/user.login.usecase';
import { UserProfileUseCase } from '../../../Contexts/user/application/usecases/user.profile.usecase';
import { ProfileFindByQueryFilterUseCase } from '../../../Contexts/user/application/usecases/user.profile.find.query.filter.usecase';
import { TweetCreateUseCase } from '../../../Contexts/tweet/application/usecase/tweet-create.usecase';
import { TweetFindAllUseCase } from '../../../Contexts/tweet/application/usecase/tweet.find.all.usecase';
import { TweetFindByOwnerIdUseCase } from '../../../Contexts/tweet/application/usecase/tweet.find.by.id.owner.usecase';
import { TweetUpdateByIdUseCase } from '../../../Contexts/tweet/application/usecase/tweet.update.usecase';
import { TweetDeleteByIdUseCase } from '../../../Contexts/tweet/application/usecase/tweet.delete.usecase';
import { TweetLikeUseCase } from '../../../Contexts/tweet/application/usecase/tweet.like.usecase';
import { ReplyFindByIdUseCase } from '../../../Contexts/reply/application/usecases/reply.find.by.id.usecase';
import { ReplyDeleteByIdUseCase } from '../../../Contexts/reply/application/usecases/reply.delete.usecase';
import { ReplyFindByOwnerIdUseCase } from '../../../Contexts/reply/application/usecases/reply.find.by.owner.usecase';
import { ReplyLikeUseCase } from '../../../Contexts/reply/application/usecases/reply.like.usecase';
import { ReplyFindByTweetIdUseCase } from '../../../Contexts/reply/application/usecases/reply.find.by.tweet.usecase';
import { TweetFindByIdUseCase } from '../../../Contexts/tweet/application/usecase/tweet.find.by.id.usecase';
import { ReplyCreateToReplyUseCase } from '../../../Contexts/reply/application/usecases/replyToReply/reply.create.to.reply';
import { ReplyFindByParentReplyIdUseCase } from '../../../Contexts/reply/application/usecases/replyToReply/reply.find.by.parent.reply.usecase';
import { UserFollowingUseCase } from '../../../Contexts/user/application/usecases/user.following.usecase';
import { TweetCreatedHandler } from '../../../Contexts/user/application/event-handlers/tweet.created.handler';
import { ReplyCreatedHandler } from '../../../Contexts/user/application/event-handlers/reply.created.handler';
import { InMemoryAsyncEventBus } from '../../../Contexts/shared/infrastruture/event/event.bus';
import { UserFollowingAfterHandler } from '../../../Contexts/user/application/event-handlers/user.following.after.handler';
import { UserUnfollowedHandler } from '../../../Contexts/user/application/event-handlers/user.unfollowed.handler';
import { UserUnfollowUseCase } from '../../../Contexts/user/application/usecases/user.unfollow.usecase';
import { BookMarkRepository } from '../../../Contexts/user/infrastructure/repository/book.mark.repository';
import { UserCreatedHandler } from '../../../Contexts/user/application/event-handlers/user.created.handler';
import { IBookMarkRepository } from '../../../Contexts/tweet/domain/repository/book.mark.repository';
import { BookMarkSaveUseCase } from '../../../Contexts/user/application/usecases/bookmark/book.mark.save.usecase';
import { BookMarkRemoveUseCase } from '../../../Contexts/user/application/usecases/bookmark/book.mark.remove.usecase';
import { BookmarkVerifyTypeService } from '../../../Contexts/user/application/services/bookmark.service';

const container = new Container();

/* ========== repository =========== */
container.bind<IUserRepository>(TYPES.UserRepository).to(UserRepository);

container.bind<ITweetRepository>(TYPES.TweetRepository).to(TweetRepository);

container.bind<IReplyRepository>(TYPES.ReplyRepository).to(ReplyRepository);

container
    .bind<IBookMarkRepository>(TYPES.BookMarkRepository)
    .to(BookMarkRepository);

/* ========== user usecase =========== */
container
    .bind<UserRegisterUseCase>(TYPES.UserRegisterUseCase)
    .to(UserRegisterUseCase);

container.bind<UserLoginUseCase>(TYPES.UserLoginUseCase).to(UserLoginUseCase);

container
    .bind<UserProfileUseCase>(TYPES.UserProfileUseCase)
    .to(UserProfileUseCase);

container
    .bind<UserUnfollowUseCase>(TYPES.UserUnfollowUseCase)
    .to(UserUnfollowUseCase);

container
    .bind<UserFollowingUseCase>(TYPES.UserFollowingUseCase)
    .to(UserFollowingUseCase);

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

container
    .bind<ReplyFindByParentReplyIdUseCase>(
        TYPES.ReplyFindByParentReplyIdUseCase
    )
    .to(ReplyFindByParentReplyIdUseCase);
/*================== bookmark usecases ================== */
container
    .bind<BookMarkSaveUseCase>(TYPES.BookMarkSaveUseCase)
    .to(BookMarkSaveUseCase);
container
    .bind<BookMarkRemoveUseCase>(TYPES.BookMarkRemoveUseCase)
    .to(BookMarkRemoveUseCase);

/* ========== middleware and Service =========== */
container.bind<AuthMiddleware>(TYPES.AuthMiddleware).to(AuthMiddleware);
container.bind<JwtService>(TYPES.JwtService).to(JwtService);
container
    .bind<BookmarkVerifyTypeService>(TYPES.BookmarkVerifyTypeService)
    .to(BookmarkVerifyTypeService);

/*======== event========  */

container.bind(TYPES.EventBus).to(InMemoryAsyncEventBus).inSingletonScope();

/* =========event handler ========= */
container
    .bind(coreTypes.EventHandler)
    .to(UserCreatedHandler)
    .inSingletonScope();

container
    .bind(coreTypes.EventHandler)
    .to(TweetCreatedHandler)
    .inSingletonScope();

container
    .bind(coreTypes.EventHandler)
    .to(ReplyCreatedHandler)
    .inSingletonScope();

container
    .bind(coreTypes.EventHandler)
    .to(UserFollowingAfterHandler)
    .inSingletonScope();

container
    .bind(coreTypes.EventHandler)
    .to(UserUnfollowedHandler)
    .inSingletonScope();

export { container };
