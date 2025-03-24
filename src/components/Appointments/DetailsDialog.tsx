import { AppointmentDialogProps, AppointmentStatus, getPaymentMethodLabel, parseAppointmentStatus } from "../../types/appointment"
import { Modal } from "../utils/Modal"

export const DetailsDialog = ({cancel_method, appointment, notify}: AppointmentDialogProps) => {
  return (
    <Modal>
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h3 className="text-xl font-bold text-marrom-escuro mb-4">
          Detalhes do Agendamento
        </h3>

        <div className="mb-6">
          <h4 className="text-lg font-semibold text-marrom-escuro mb-2">
            Cliente
          </h4>
          <p className="text-marrom-claro">
            <span className="font-medium">Nome:</span> {appointment.customer.name}
          </p>
          <p className="text-marrom-claro">
            <span className="font-medium">Email:</span> {appointment.customer.email}
          </p>
        </div>

        <div className="mb-6">
          <h4 className="text-lg font-semibold text-marrom-escuro mb-2">
            Serviços
          </h4>
          <ul className="space-y-2">
            {appointment.services.map((service, index) => (
              <li key={index} className="text-marrom-claro">
                <span className="font-medium">{service.name}:</span> R${" "}
                {service.price.toFixed(2)}
              </li>
            ))}
          </ul>
          <p className="text-marrom-claro mt-2">
            <span className="font-medium">Total:</span> R${" "}
            {appointment.services.reduce((total, service) => total + service.price, 0).toFixed(2)}
          </p>
        </div>

        <div className="mb-6">
          <h4 className="text-lg font-semibold text-marrom-escuro mb-2">
            Status do Atendimento
          </h4>
          <p className="text-marrom-claro">
            {parseAppointmentStatus(appointment.status) === AppointmentStatus.pending && (
              <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-sm">
                Pendente
              </span>
            )}
            {parseAppointmentStatus(appointment.status) === AppointmentStatus.done && (
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm">
                Concluído
              </span>
            )}
            {parseAppointmentStatus(appointment.status) === AppointmentStatus.canceled && (
              <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-sm">
                Cancelado
              </span>
            )}
          </p>
        </div>

        <div className="mb-6">
          <h4 className="text-lg font-semibold text-marrom-escuro mb-2">
            Data e Hora
          </h4>
          <p className="text-marrom-claro">
            {appointment.appointment_date} às {appointment.appointment_time}
          </p>
        </div>
        {parseAppointmentStatus(appointment.status) === AppointmentStatus.done &&
          <div className="mb-6">
            <h4 className="text-lg font-semibold text-marrom-escuro mb-2">
              Forma de Pagamento
            </h4>
            <p className="text-marrom-claro">
              {appointment.payment_method ? getPaymentMethodLabel(appointment.payment_method) : ''}
            </p>
          </div>
        }

        <div className="flex justify-end">
          <button
            onClick={() => cancel_method(null)}
            className="bg-cinza-paleta text-marrom-escuro px-4 py-2 rounded-lg hover:bg-marrom-claro hover:text-claro transition-colors"
          >
            Fechar
          </button>
        </div>
      </div>
    </Modal>
  )
}