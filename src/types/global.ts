import { Appointment } from "./appointment"

export type DoneDialogProps = {
  cancel_method: (appointment: Appointment | null) => void,
  appointment: Appointment,
  notify: NotifyType
}

export type NotifyType = (type: "success" | "error" | "info" | "warning", message: string) => void
