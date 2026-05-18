import { useState } from "react";
import { Modal } from "../utils/Modal";
import { doneAppointmentService } from "../../services/appointment";
import { AppointmentDialogProps, AppointmentPaymentMethod } from "../../types/appointment";
import { useAppointments } from "../../contexts/AppointmentContext";


export const DoneDialog = ({cancel_method, appointment, notify}: AppointmentDialogProps) => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<AppointmentPaymentMethod>(AppointmentPaymentMethod.credit_card);
  const [details, setDetails] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { setRefreshAppointments } = useAppointments();
  
    const setMethod = async () => {
      setIsSubmitting(true);
      await doneAppointmentService({
        id: appointment.id,
        payment_method: selectedPaymentMethod,
        details,
      }).then((res) => {
        cancel_method(null);
        setRefreshAppointments(true);
        notify('success',res.data.message);
      }).catch(() => {
        notify('error' ,'Erro ao concluir atendimento. Entre em contato com o administrador do sistema.')
      }).finally(() => {
        setIsSubmitting(false);
      })
  }

  return (
    <Modal>
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h3 className="text-xl font-bold text-marrom-escuro mb-4">
          Deseja concluir o agendamento de {appointment.customer.name}?
        </h3>
        <p className="text-marrom-claro mb-4">
          Selecione o método de pagamento utilizado pelo cliente:
        </p>
        <div className="space-y-2">
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              value={AppointmentPaymentMethod.credit_card}
              checked={selectedPaymentMethod === "credit_card"}
              onChange={() => setSelectedPaymentMethod(AppointmentPaymentMethod.credit_card)}
            />
            <span>Cartão de Crédito</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              value={AppointmentPaymentMethod.debit}
              checked={selectedPaymentMethod === AppointmentPaymentMethod.debit}
              onChange={() => setSelectedPaymentMethod(AppointmentPaymentMethod.debit)}
            />
            <span>Cartão de Débito</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              value={AppointmentPaymentMethod.money}
              checked={selectedPaymentMethod === AppointmentPaymentMethod.money}
              onChange={() => setSelectedPaymentMethod(AppointmentPaymentMethod.money)}
            />
            <span>Dinheiro</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              value={AppointmentPaymentMethod.pix}
              checked={selectedPaymentMethod === AppointmentPaymentMethod.pix}
              onChange={() => setSelectedPaymentMethod(AppointmentPaymentMethod.pix)}
            />
            <span>PIX</span>
          </label>
        </div>
        <label className="block mt-5 text-sm font-semibold text-marrom-escuro">
          Detalhes da conclusão
        </label>
        <textarea
          value={details}
          onChange={(e) => setDetails(e.target.value)}
          placeholder="Ex.: cliente pagou parte em PIX, adicionou barba, observações do atendimento..."
          className="mt-2 w-full p-3 border border-cinza-paleta rounded-lg focus:outline-none focus:ring-2 focus:ring-areia resize-none"
          rows={4}
        />
        <div className="flex justify-end mt-6 space-x-4">
          <button
            onClick={() => cancel_method(null)}
            disabled={isSubmitting}
            className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={() => setMethod()}
            disabled={isSubmitting}
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? "Concluindo..." : "Confirmar"}
          </button>
        </div>
      </div>
    </Modal>
  )
}
