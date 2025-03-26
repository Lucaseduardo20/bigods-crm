import { UserSchedule } from "../types/user";
import { api } from "./api";

export const previewService = async (token: string) => {
    const response = await api.get('/user/preview', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data;
}

export const storeAvailableSchedule = async (payload: UserSchedule) => {
    return await api.post('/user/available-schedules', payload).then((res) => {
        return res;
    }).catch((err) => {
        return err;
    });
}

export const getSchedulesService = async ()=> {
    return await api.get( '/user/available-schedules').then((res: any) => {
        return res
    }).catch((err: any) => {
        return err
    })
} 