import { useEffect, useState } from "react";
import { useAuth } from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import Logo from '../assets/logo-light-sem-subtitulo.png'
import { previewService } from "../services/user";
import { Appointment } from "../types/appointment";
import { FaBars, FaTimes } from 'react-icons/fa';
import { Header } from "../components/utils/Header";
import { NotifyType } from "../types/global";
import { toast } from "react-toastify";
import { DetailsDialog } from "../components/Appointments/DetailsDialog";

export const Home = () => {
  const { isAuthenticated, user } = useAuth(); 
  const navigate = useNavigate();
  const [nextAppointments, setNextAppointments] = useState<Appointment[]>([]);
  const [appointmentsCount, setAppointmentsCount] = useState<number>();
  const [commission, setCommission] = useState<number>();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [detailsAppointment, setDetailsAppointment] = useState<Appointment | null>(null);
    const notify: NotifyType = (type, message) => {
      toast[type](message);
    };
  

  useEffect(() => {
    const checkAndFetchData = async () => {
      const token = localStorage.getItem("token");
  
      if (!token) {
        navigate("/");
        return;
      }
  
      try {
        const res = await previewService(token);
        setNextAppointments(res.next_appointments);
        setCommission(res.commission);
        setAppointmentsCount(res.total_week_appointments);
      } catch (err: any) {
        console.log(err);
        alert(err);
      }
    };
  
    checkAndFetchData();
  }, []);

  return (
    <section className="min-h-screen bg-gradient-to-b from-[#643f23] to-[#ffecb9] p-4 pt-24">
      <Header />
      <main className="container mx-auto">
        <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
          <h1 className="text-2xl font-bold text-marrom-escuro">
            Olá, {user?.name || "Usuário"}!
          </h1>
          <p className="text-marrom-claro">Bem-vindo de volta ao seu painel.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-pele p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold text-marrom-escuro mb-2">
              Comissão Semanal
            </h2>
            <p className="text-3xl font-bold text-areia">
              {commission}
            </p>
          </div>

          <div className="bg-pele p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold text-marrom-escuro mb-2">
              Agendamentos Restantes
            </h2>
            <p className="text-3xl font-bold text-areia">
              {appointmentsCount}
            </p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold text-marrom-escuro mb-4">
            Próximos Agendamentos
          </h2>
          <ul className="space-y-4">
            {nextAppointments.map((appointment) => (
              <li
                key={appointment.id}
                className="bg-claro p-4 rounded-lg shadow-sm"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-bold text-marrom-escuro">
                      {appointment.customer.name}
                    </p>
                    <p className="text-marrom-claro">
                      {appointment.appointment_date} às {appointment.appointment_time}
                    </p>
                  </div>
                  <button 
                    onClick={() => setDetailsAppointment(appointment)}
                    className="bg-areia text-marrom-escuro px-4 py-2 rounded-lg hover:bg-pele transition-colors"
                  >
                    Detalhes
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>

      {detailsAppointment && (
        <DetailsDialog cancel_method={setDetailsAppointment} appointment={detailsAppointment} notify={notify}/>
      )}
      </main>
    </section>
  );
};