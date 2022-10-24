import { inject } from "inversify"
import { controller, httpPost } from "inversify-express-utils"

@controller('/tweeter')
export class TweetCreateController {
    constructor(
    ) { }

    @httpPost('/create')
    async execute(req: UserRequest<UserLogintDtoType>, res: Response, next: NextFunction) {
        try {

        } catch (error) {
            next(error)
        }

    }
}