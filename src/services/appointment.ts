import { DoneAppointmentType, CancelAppointmentType } from "../types/appointment";
import { api } from "./api"

export const getAppointments = async () => {
    const response = await api.get('/appointments');
    return response.data;
}

export const doneAppointmentService = async ({ id, payment_method, details }: DoneAppointmentType) => {
    return api.post('/appointments/done', {
        id,
        payment_method,
        details: details?.trim() || undefined,
    });
};

export const cancelAppointmentService = async ({id, reason}: CancelAppointmentType) => {
    return api.post('/appointments/cancel', { id, reason });
}
