import { Container } from 'inversify'
import { UserLoginUseCase } from './application/use-cases/user.login.usecase';
import { UserRegisterUseCase } from './application/use-cases/user.register.usecase';
import { IUserRepository } from './domain/repository/user.repository';
import { UserRepository } from './infrastruture/repositories/user.repository'
import { TYPES } from './types';

const container = new Container();
/* 
container.bind<UserRegisterUseCase>(ContainerTypes.UserRegisterUseCase).to(UserRegisterUseCase);
container.bind<UserLoginController>(ContainerTypes.UserLoginController).to(UserLoginController) */
container.bind<UserRegisterUseCase>(TYPES.UserRegisterUseCase).to(UserRegisterUseCase)
container.bind<UserLoginUseCase>(TYPES.UserLoginUseCase).to(UserLoginUseCase)
container.bind<IUserRepository>(TYPES.UserRepository).to(UserRepository)

export { container }