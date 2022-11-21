import { UserModel } from "../../domain/models/user.model";
import { UuidVO } from "../../domain/value-objects/uuid.vo";
import { UserSchema } from "../schemas/user.schema";
import { UsernameVO } from "../../domain/value-objects/user/username.vo";
import { PasswordVO } from "../../domain/value-objects/user/password.vo";
import { EmailVO } from "../../domain/value-objects/user/email.vo";
import { IUserRepository } from "../../domain/repository/user.repository";
import { IUser } from "../types/schemas/user-doc.interface";
import { injectable } from "inversify";

@injectable()
export class UserRepository implements IUserRepository {

    /**
     * It takes an object that implements the IUser interface and returns a UserModel object
     * @param {IUser} persistanceUser - IUser - This is the user object that we get from the database.
     * @returns A UserModel
     */
    /* TODO */
    private toDomain(persistanceUser: IUser): UserModel {
        const { _id, username, email, password } = persistanceUser
        return new UserModel(
            new UuidVO(_id),
            new UsernameVO(username),
            new EmailVO(email),
            new PasswordVO(password)
        )
    }

    /**
     * It takes a domain user and returns a persistance user
     * @param {UserModel} domainUser - UserModel - this is the domain model that we want to convert to a
     * persistance model.
     * @returns an object of type IUser.
     */

    private toPersistance(domainUser: UserModel): IUser {

        return {
            _id: domainUser.id.value,
            username: domainUser.username.value,
            email: domainUser.email.value,
            password: domainUser.password?.value

        }
    }

    async create(userModel: UserModel): Promise<UserModel | null> {
        const userPersistance = this.toPersistance(userModel)
        const user = new UserSchema(userPersistance)
        const userSave = await user.save()
        return this.toDomain(userSave)
    }


    async findById(id: UuidVO): Promise<UserModel | null> {
        const userFound = await UserSchema.findById(id.value)
        if (!userFound) return null
        const userDomain = this.toDomain(userFound)
        return userDomain
    }



    async findByEmail(email: EmailVO): Promise<UserModel | null> {
        const userFound = await UserSchema.findOne({ email: email.value })
        if (!userFound) return null
        return this.toDomain(userFound)
    }

    async findAll() {
        return UserSchema.find()
    }

    async findByUsername(username: UsernameVO): Promise<UserModel | null> {
        const userFound = await UserSchema.findOne({ username: username.value })
        if (!userFound) return null
        return this.toDomain(userFound)
    }

}

