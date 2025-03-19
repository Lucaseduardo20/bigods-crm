import { useState } from "react";
import { Modal } from "../utils/Modal";
import { doneAppointmentService } from "../../services/appointment";
import { AppointmentPaymentMethod } from "../../types/appointment";
import { ToastContainer, toast } from "react-toastify";
import { useAppointments } from "../../contexts/AppointmentContext";

export const DoneDialog = ({cancel_method, appointment}: any) => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<AppointmentPaymentMethod>(AppointmentPaymentMethod.credit_card);
  const notify = (type: "success" | "error" | "info" | "warning", message: string) => {
    toast[type](message);
  };
  const {refreshAppointments, setRefreshAppointments} = useAppointments();
  
    const setMethod = async () => {
      const token = localStorage.getItem('token');
      await doneAppointmentService({
        token: token,
        id: appointment.id,
        payment_method: selectedPaymentMethod
      }).then((res: any) => {
        cancel_method(null);
        setRefreshAppointments(true);
        notify('success',res.data.message);
      }).catch((err: any) => {
        notify('error' ,'Erro ao concluir atendimento. Entre em contato com o administrador do sistema.')
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
        <div className="flex justify-end mt-6 space-x-4">
          <button
            onClick={() => cancel_method(null)}
            className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={() => setMethod()}
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
          >
            Confirmar
          </button>
        </div>
      </div>
      <ToastContainer />
    </Modal>
  )
}