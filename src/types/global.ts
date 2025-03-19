import { Appointment } from "./appointment"

export type NotifyType = (type: "success" | "error" | "info" | "warning", message: string) => void
