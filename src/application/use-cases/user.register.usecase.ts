import { EmailVO } from "../../domain/value-objects/emial.vo"
import { PasswordVO } from "../../domain/value-objects/password.vo"
import { UsernameVO } from "../../domain/value-objects/username.vo"
import { UuidVO } from "../../domain/value-objects/uuid.vo"

export const userRegisterUseCase = async (id: string, username: string, email: string, password: string) => {
    const idVO = new UuidVO(id)
    const usernameVO = new UsernameVO(username)
    const emailVO = new EmailVO(email)
    const passwordVO = new PasswordVO(password)
    console.log(idVO, usernameVO, emailVO, passwordVO)

    return { id: idVO._value, username: usernameVO._value, email: emailVO._value, password: passwordVO._value }
}
