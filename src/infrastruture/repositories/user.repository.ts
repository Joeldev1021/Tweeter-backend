import { IUser } from "../interface/user.interface";
import { UserModel } from "../../domain/models/user.model";
import { UuidVO } from "../../domain/value-objects/uuid.vo";
import { UserSchema } from "../schema/user.schema";
import { UsernameVO } from "../../domain/value-objects/username.vo";
import { PasswordVO } from "../../domain/value-objects/password.vo";
import { EmailVO } from "../../domain/value-objects/emial.vo";

class UserRepository {



    private toDomian(user: IUser): UserModel {
        const { _id, username, email, password } = user
        return new UserModel(
            new UuidVO(_id),
            new UsernameVO(username),
            new EmailVO(email),
            new PasswordVO(password)
        )
    }


    private toPersistance(domainUser: UserModel): IUser {
        return {
            _id: domainUser.id.value,
            username: domainUser.username.value,
            email: domainUser.email.value,
            password: domainUser.password.value

        }
    }
    async create(user: UserModel): Promise<UserModel | undefined> {

        const userPersistance = this.toPersistance(user)
        const newUser = new UserSchema(userPersistance)
        return this.toDomian(newUser)
    }
    async findById(id: UuidVO) {
        const userFound = await UserSchema.findById(id.value)
        if (userFound)
            return this.toDomian(userFound)
    }

    async findByEmail(email: EmailVO): Promise<UserModel | undefined> {
        const userFound = await UserSchema.findOne({ email: email.value })
        if (userFound)
            return this.toDomian(userFound)
    }

}


export default new UserRepository()