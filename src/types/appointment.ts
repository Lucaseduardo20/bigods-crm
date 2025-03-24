import { NotifyType } from "./global";

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
    services: Service[],
    payment_method?: AppointmentPaymentMethod,
    estimated_time: string
}

export type Service = {
    price: number,
    name: string
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

export type AppointmentDialogProps = {
    cancel_method: (appointment: Appointment | null) => void,
    appointment: Appointment,
    notify: NotifyType
  }

//resolve types functions 

const appointmentStatusMap: Record<string, AppointmentStatus> = {
    pending: AppointmentStatus.pending,
    scheduled: AppointmentStatus.scheduled,
    canceled: AppointmentStatus.canceled,
    done: AppointmentStatus.done,
};

const paymentMethodLabels: Record<AppointmentPaymentMethod, string> = {
    [AppointmentPaymentMethod.pix]: "PIX",
    [AppointmentPaymentMethod.credit_card]: "Cartão de Crédito",
    [AppointmentPaymentMethod.debit]: "Cartão de Débito",
    [AppointmentPaymentMethod.money]: "Dinheiro",
};


export function parseAppointmentStatus(status: string): AppointmentStatus {
    return appointmentStatusMap[status] || AppointmentStatus.pending;
}

export function getPaymentMethodLabel(method: AppointmentPaymentMethod | string): string {
    const normalizedMethod = 
        typeof method === 'string' 
            ? (AppointmentPaymentMethod[method as keyof typeof AppointmentPaymentMethod] || AppointmentPaymentMethod.pix)
            : method;
    
    return paymentMethodLabels[normalizedMethod] || "Método desconhecido";
}