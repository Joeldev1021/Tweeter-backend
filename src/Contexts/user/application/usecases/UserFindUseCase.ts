import { injectable } from "inversify";

@injectable()
export class UserFindUseCase {
    constructor() {}

    public async execute(
        userId: UserId,
    ): Promise<User|null> {
        return null;
    }
}
