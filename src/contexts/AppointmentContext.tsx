import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { AppointmentContextType, Appointment } from "../types/appointment";
import { cancelAppointmentService, getAppointments } from "../services/appointment";
import { AxiosResponse } from "axios";

const AppointmentContext = createContext<AppointmentContextType | undefined>(undefined)

export const AppointmentProvider = ({ children }: { children: ReactNode }) => {
  const [appointments, setAppointments] = useState([] as Appointment[]);
  const [refreshAppointments, setRefreshAppointments] = useState(false);

  const getAppointmentsApi = async () => {
    await getAppointments().then((value) => {
      setAppointments(value);
    }).catch((error) => {
      return error;
    })
  }

  return (
    <AppointmentContext.Provider value={{ appointments, setAppointments, getAppointmentsApi, refreshAppointments, setRefreshAppointments } as AppointmentContextType}>
      {children}
    </AppointmentContext.Provider>
  );
}

export const useAppointments = () => {
  const context = useContext(AppointmentContext);
  if (!context) {
    throw new Error('useAppointments deve ser usado dentro de AppointmentsProvider');
  }
  return context;
};