import { DoneAppointmentType, CancelAppointmentType } from "../types/appointment";
import { api } from "./api"

export const getAppointments = async () => {
    const response = await api.get('/appointments');
    return response.data;
}

export const doneAppointmentService = async ({ id, payment_method }: DoneAppointmentType) => {
    return await api.post('/appointments/done', 
        { id, payment_method },
    )
    .then((response) => {
        return response;
    })
    .catch((err) => {
        console.log(err);
        return err;
    });
};

export const cancelAppointmentService = async ({id, reason}: CancelAppointmentType) => {
    await api.post('/appointments/done', {id: id, reason: reason}).then((response) => {
        return response;
    }).catch((err) => {
        console.log(err);
        return err;
    })
}