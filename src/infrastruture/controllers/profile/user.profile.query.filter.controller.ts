import { NextFunction, Request, Response } from 'express';
import { inject } from 'inversify';
import { controller, httpGet } from 'inversify-express-utils';
import { TYPES } from '../../../types';
import { UserProfileUseCase } from '../../../application/use-cases/profile/user.profile.usecase';
import { AuthRequest } from '../../../infrastruture/types';
import { UsernameVO } from '../../../domain/value-objects/user/username.vo';
import { ProfileFindByQueryFilterUseCase } from '../../../application/use-cases/profile/profile.find.query.filter.usecase';
import { QUERY_FILTER } from '../../../domain/constants';
import { QueryFilterVO } from '../../../domain/value-objects/query-filter.vo';
import { UuidVO } from '../../../domain/value-objects/uuid.vo';

@controller('/user')
export class ProfileFindQueryFilterController {
  constructor(
    @inject(TYPES.ProfileFindByQueryFilterUseCase)
    private profileFindByQueryFilterUseCase: ProfileFindByQueryFilterUseCase
  ) {}
  @httpGet('/:id?query=query', TYPES.AuthMiddleware)
  async execute(req: AuthRequest<Request>, res: Response, next: NextFunction) {
    const { query } = req.query;
    const id = req.params.id;
    //todo -> get with id user
    try {
      const user = await this.profileFindByQueryFilterUseCase.execute(
        new UuidVO(id),
        new QueryFilterVO(`${query}`)
      );
      res.status(200).send(user);
    } catch (error) {
      next(error);
    }
  }
}
