import { UserType } from "./user"

export type loginData = {
    email: string,
    password: string
}

export type AuthResponse = {
    token: string,
    user: UserType
}
