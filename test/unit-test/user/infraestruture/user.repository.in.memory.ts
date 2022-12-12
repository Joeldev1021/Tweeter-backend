import { UuidVO } from '../../../../src/shared/domain/value-objects/uuid.vo';
import { UserModel } from '../../../../src/user/domain/models/user.model';
import { IUserRepository } from '../../../../src/user/domain/repository/user.repository';
import { EmailVO } from '../../../../src/user/domain/value-objects/email.vo';
import { UsernameVO } from '../../../../src/user/domain/value-objects/username.vo';
interface UserIndexed {
    [id: string]: UserModel;
}

export class UserRepositoryInMemory implements IUserRepository {
    private users: UserModel[] = [];
    private usersIndexed: UserIndexed = {};

    /* async searchOne(id: UuidVO): Promise<User | null> {
        return await new Promise(resolve => {
            const user: User = this.usersIndexed[id.getValue()];
            if (!user) {
                resolve(null);
            }

            resolve(user);
        });
    } */

    findById(id: UuidVO): Promise<UserModel | null> {
        return new Promise(resolve => {
            resolve(this.users[id.value]);
        });
    }

    create(user: UserModel): Promise<UserModel | null> {
        return new Promise(resolve => {
            this.addUserInMemory(user);
            resolve(user);
        });
    }

    update(userToUpdate: UserModel): Promise<UserModel | null> {
        return new Promise(resolve => {
            this.delete(userToUpdate.id);
            this.addUserInMemory(userToUpdate);
            resolve(userToUpdate);
        });
    }

    findByEmail(email: EmailVO): Promise<UserModel | null> {
        return new Promise(resolve => {
            const userEmail = this.users.find(
                (user: UserModel) => user.email.value === email.value
            );
            if (!userEmail) return null;
            resolve(userEmail);
        });
    }

    findByUsername(username: UsernameVO): Promise<UserModel | null> {
        return new Promise(resolve => {
            const user = this.users.find(
                (user: UserModel) => user.username.value === username.value
            );
            if (!user) return null;
            resolve(user);
        });
    }
    /* 
    delete(userToDelete: User): Promise<void> {
        return new Promise(resolve => {
            this.users = this.users.filter(
                (user: User) => user.getValueId() !== userToDelete.getValueId()
            );
            delete this.usersIndexed[userToDelete.getValueId()];
            resolve();
        });
    } */

    delete(id: UuidVO): Promise<UserModel | null> {
        return new Promise(resolve => {
            this.users = this.users.filter(
                (user: UserModel) => user.id.value !== id.value
            );
            const response = this.usersIndexed[id.value];
            delete this.usersIndexed[id.value];

            resolve(response);
        });
    }

    public addUsers(...users: UserModel[]): void {
        users.map(user => this.addUserInMemory(user));
    }

    private addUserInMemory(user: UserModel): void {
        this.users.push(user);
        this.usersIndexed[user.id.value] = user;
    }
}
