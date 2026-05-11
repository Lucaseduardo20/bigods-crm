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
    return api.post('/user/available-schedules', payload);
}

export const getSchedulesService = async ()=> {
    return api.get('/user/available-schedules')
} 

export const deleteScheduleService = async (id: number)=> {
    return api.delete('/user/available-schedules/' + id)
} 
