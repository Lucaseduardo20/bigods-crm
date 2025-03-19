export type AppointmentContextType = {
    appointments: Appointment[];
    setAppointments: () => void;
    getAppointmentsApi: () => any,
    refreshAppointments: boolean,
    setRefreshAppointments: (refreshingAppointments: boolean) => void

}

export type Appointment = {
    id: number,
    customer: Customer,
    appointment_date: string,
    appointment_time: string,
    status: AppointmentStatus,
    assigned_to?: string,
    payment_method?: AppointmentPaymentMethod,
    estimated_time: string
}

export type Customer = {
    name: string,
    email: string,
    tel: string,
}
export enum AppointmentStatus {
    pending = 'Pendente',
    scheduled = 'Agendado',
    canceled = 'Cancelado',
    done = 'Concluído'
}

export enum AppointmentPaymentMethod {
    pix = 'pix',
    credit_card = 'credit_card',
    debit = 'debit_card',
    money = 'money'
}

export interface DoneAppointmentType {
    id: number,
    payment_method: AppointmentPaymentMethod
}

export interface CancelAppointmentType {
    id: number,
    reason: string
}

//resolve types functions 

const appointmentStatusMap: Record<string, AppointmentStatus> = {
    pending: AppointmentStatus.pending,
    scheduled: AppointmentStatus.scheduled,
    canceled: AppointmentStatus.canceled,
    done: AppointmentStatus.done,
};


export function parseAppointmentStatus(status: string): AppointmentStatus {
    return appointmentStatusMap[status] || AppointmentStatus.pending;
}