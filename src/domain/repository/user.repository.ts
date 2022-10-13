import { UserModel } from "../models/user.model";
import { EmailVO } from "../value-objects/emial.vo";
import { UuidVO } from "../value-objects/uuid.vo";

export interface IUserRepository {

    /**
    * It finds a user by id.
    * @param {UuidVO} id - UuidVO
    * @returns A {UserModel}
    */
    findById(id: UuidVO): Promise<UserModel | undefined>

    /**
     * It finds a user by email and returns a domain object
     * @param {EmailVO} email - EmailVO
     * @returns A UserModel or undefined
     */
    findByEmail(email: EmailVO): Promise<UserModel | undefined>

    /**
     * It takes a user object, converts it to a user persistance object, creates a new user schema
     * object, and then converts it back to a user object
     * @param {UserModel} user - UserModel - this is the user object that we are passing in.
     * @returns The user is being returned.
     */
    create(user: UserModel): Promise<UserModel | undefined>


}