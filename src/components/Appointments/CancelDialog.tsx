import { useState } from "react";
import { Modal } from "../utils/Modal";
import { cancelAppointmentService } from "../../services/appointment";
import { AppointmentDialogProps } from "../../types/appointment";
import { useAppointments } from "../../contexts/AppointmentContext";

export const CancelDialog = ({ cancel_method, appointment, notify }: AppointmentDialogProps) => {
  const [cancelReason, setCancelReason] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { setRefreshAppointments } = useAppointments();

  const handleCancel = async () => {
    if (!cancelReason.trim()) {
      notify("error", "Por favor, insira o motivo do cancelamento.");
      return;
    }
    setIsSubmitting(true);
    return await cancelAppointmentService({id: appointment.id, reason: cancelReason.trim()}).then(() => {
        cancel_method(null)
        setRefreshAppointments(true);
        notify('info', 'Agendamento cancelado com sucesso!')
    }).catch(() => {
        notify('error', 'Erro ao cancelar agendamento, entre em contato com o administrador!')
    }).finally(() => {
        setIsSubmitting(false);
    })
  };

  return (
    <Modal>
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h3 className="text-xl font-bold text-marrom-escuro mb-4">
          Cancelar Agendamento
        </h3>
        <p className="text-marrom-claro mb-4">
          Você está prestes a cancelar o agendamento de{" "}
          <span className="font-semibold">{appointment.customer.name}</span>.
          Por favor, informe o motivo do cancelamento:
        </p>

        <textarea
          value={cancelReason}
          onChange={(e) => setCancelReason(e.target.value)}
          placeholder="Digite o motivo do cancelamento..."
          className="w-full p-3 border border-cinza-paleta rounded-lg focus:outline-none focus:ring-2 focus:ring-areia resize-none"
          rows={4}
        />

        <div className="flex justify-end mt-6 space-x-4">
          <button
            onClick={() => cancel_method(null)}
            disabled={isSubmitting}
            className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
          >
            Voltar
          </button>
          <button
            onClick={handleCancel}
            disabled={isSubmitting}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? "Cancelando..." : "Confirmar Cancelamento"}
          </button>
        </div>
      </div>
    </Modal>
  );
};
