import { Container } from 'inversify'
import { UserRegisterUseCase } from './application/use-cases/user.register.usecase';
import { TYPES } from './types';
import { IUserRegisterController } from './domain/interface/controller/user.register.controller';
import { UserLoginController } from './infrastruture/controllers/user.login.controller';
import { UserRegisterController } from './infrastruture/controllers/user.register.controller';

export const container = new Container();
/* 
container.bind<UserRegisterUseCase>(ContainerTypes.UserRegisterUseCase).to(UserRegisterUseCase);
container.bind<UserLoginController>(ContainerTypes.UserLoginController).to(UserLoginController) */
container.bind<IUserRegisterController>(TYPES.UserRegisterController).to(UserRegisterController)

