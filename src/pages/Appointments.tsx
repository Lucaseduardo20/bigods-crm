import { useEffect, useState } from "react";
import { Header } from "../components/utils/Header";
import { FaPlus, FaFilter, FaCheck, FaTimes, FaInfoCircle, FaUser, FaCalendar, FaCreditCard } from "react-icons/fa";
import { useAuth } from "../contexts/AuthContext";
import { useAppointments } from "../contexts/AppointmentContext";
import { Appointment, AppointmentStatus, parseAppointmentStatus } from "../types/appointment";
import { Modal } from "../components/utils/Modal";
import { DoneDialog } from "../components/Appointments/DoneDialog";
import { ToastContainer, toast } from "react-toastify";

export const Appointments = () => {
  const [filter, setFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState<string>("");
  const [error, setError] = useState() as any;
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userFilter, setUserFilter] = useState<string>("");
  const [paymentFilter, setPaymentFilter] = useState<"all" | "credit_card" | "debit_card" | "money" | "pix">("all");
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null); // Agendamento selecionado para conclusão
  const { user } = useAuth();
  const { getAppointmentsApi, appointments, refreshAppointments, setRefreshAppointments } = useAppointments();
  const notify = ({type, message}: {type:  "success" | "error" | "info" | "warning", message: string}) => {
    toast[type](message);
  };


  useEffect(() => {
    const fetchAppointments = async () => {
      if (!refreshAppointments) setLoading(true);
  
      const token: string = localStorage.getItem("token") as string;
      try {
        await getAppointmentsApi(token);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
        setRefreshAppointments(false);
      }
    };
  
    fetchAppointments();
  }, [refreshAppointments]);

  const filteredAppointments = appointments.filter((appointment: Appointment) => {
    const matchesStatus = filter === "all" || appointment.status === filter;
    const matchesDate = dateFilter ? appointment.appointment_date === dateFilter : true;
    const matchesUser = userFilter ? appointment.assigned_to === userFilter : true;
    const matchesPayment = paymentFilter === "all" || appointment.payment_method === paymentFilter;

    return matchesStatus && matchesDate && matchesUser && matchesPayment;
  });

  return (
    <section className="min-h-screen bg-gradient-to-b from-[#643f23] to-[#ffecb9] p-4 pt-24">
      <Header />

      {/* Botão de Incluir Atendimento */}
      <div className="container mx-auto mb-6">
        <button className="w-full md:w-auto bg-areia text-marrom-escuro font-bold py-2 px-4 rounded-lg hover:bg-pele transition-colors flex items-center justify-center">
          <FaPlus className="mr-2" />
          Incluir Atendimento
        </button>
      </div>

      {/* Filtros */}
      <div className="container mx-auto mb-6">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setFilter("all")}
            className={`px-4 py-2 rounded-lg ${
              filter === "all" ? "bg-marrom-escuro text-claro" : "bg-claro text-marrom-escuro"
            } hover:bg-marrom-claro hover:text-claro transition-colors`}
          >
            Todos
          </button>
          <button
            onClick={() => setFilter("pending")}
            className={`px-4 py-2 rounded-lg ${
              filter === "pending" ? "bg-marrom-escuro text-claro" : "bg-claro text-marrom-escuro"
            } hover:bg-marrom-claro hover:text-claro transition-colors`}
          >
            Pendentes
          </button>
          <button
            onClick={() => setFilter("done")}
            className={`px-4 py-2 rounded-lg ${
              filter === "done" ? "bg-marrom-escuro text-claro" : "bg-claro text-marrom-escuro"
            } hover:bg-marrom-claro hover:text-claro transition-colors`}
          >
            Concluídos
          </button>
          <button
            onClick={() => setFilter("canceled")}
            className={`px-4 py-2 rounded-lg ${
              filter === "canceled" ? "bg-marrom-escuro text-claro" : "bg-claro text-marrom-escuro"
            } hover:bg-marrom-claro hover:text-claro transition-colors`}
          >
            Cancelados
          </button>

          <div className="relative flex items-center">
            <input
              type="date"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="px-4 py-2 rounded-lg bg-claro text-marrom-escuro focus:outline-none focus:ring-2 focus:ring-areia"
            />
            <FaCalendar className="absolute right-3 text-marrom-escuro" />
          </div>

          {user.role === 'Administrador' && (
            <>
              <div className="relative flex items-center">
                <select
                  value={userFilter}
                  onChange={(e) => setUserFilter(e.target.value)}
                  className="px-4 py-2 rounded-lg bg-claro text-marrom-escuro focus:outline-none focus:ring-2 focus:ring-areia"
                >
                  <option value="">Todos os Usuários</option>
                  <option value="Admin 1">Admin 1</option>
                  <option value="Admin 2">Admin 2</option>
                </select>
                <FaUser className="absolute right-3 text-marrom-escuro" />
              </div>

              <div className="relative flex items-center">
                <select
                  value={paymentFilter}
                  onChange={(e) => setPaymentFilter(e.target.value as "all" | "credit_card" | "debit_card" | "money" | "pix")}
                  className="px-4 py-2 rounded-lg bg-claro text-marrom-escuro focus:outline-none focus:ring-2 focus:ring-areia"
                >
                  <option value="all">Todos os Métodos</option>
                  <option value="credit_card">Cartão de Crédito</option>
                  <option value="debit_card">Cartão de Débito</option>
                  <option value="money">Dinheiro</option>
                  <option value="pix">PIX</option>
                </select>
                <FaCreditCard className="absolute right-3 text-marrom-escuro" />
              </div>
            </>
          )}
        </div>
      </div>

      {/* Lista de Agendamentos */}
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAppointments.map((appointment) => (
            <div
              key={appointment.id}
              className="bg-white p-6 rounded-lg shadow-lg"
            >
              <div className="mb-4">
                <h3 className="text-xl font-bold text-marrom-escuro">
                  {appointment.customer.name}
                </h3>
                <p className="text-marrom-claro">
                  {appointment.appointment_date} às {appointment.appointment_time}
                </p>
                <p className="text-marrom-claro">
                  Duração: {appointment.estimated_time}
                </p>
                {appointment.assigned_to && (
                  <p className="text-marrom-claro">
                    Responsável: {appointment.assigned_to}
                  </p>
                )}
              </div>

              <div className="flex flex-wrap gap-2">
                {parseAppointmentStatus(appointment.status) === AppointmentStatus.pending && (
                  <>
                    <button
                      onClick={() => setSelectedAppointment(appointment)}
                      className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors flex items-center"
                    >
                      <FaCheck className="mr-2" />
                      Concluir
                    </button>
                    <button className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors flex items-center">
                      <FaTimes className="mr-2" />
                      Cancelar
                    </button>
                  </>
                )}
                <button className="bg-areia text-marrom-escuro px-4 py-2 rounded-lg hover:bg-pele transition-colors flex items-center">
                  <FaInfoCircle className="mr-2" />
                  Detalhes
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedAppointment && (
        <DoneDialog cancel_method={setSelectedAppointment} appointment={selectedAppointment}/>
      )}
      <ToastContainer />
    </section>
  );
};