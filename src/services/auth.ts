import { api } from "./api"
import { AuthResponse, loginData } from "../types/auth"

export const loginService = async (data: loginData) => {
    const response = await api.post<AuthResponse>('/login', data)
    return response;
}
