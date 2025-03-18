import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import Logo from '../assets/logo-light-sem-subtitulo.png'
import { previewService } from "../services/user";
import { Appointment } from "../types/appointment";

export const Home = () => {
  const { isAuthenticated, user } = useAuth(); 
  const navigate = useNavigate();
  const [nextAppointments, setNextAppointments] = useState<Appointment[]>([]);
  const [appointmentsCount, setAppointmentsCount] = useState();
  const [commission, setCommission] = useState();

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

  const agendamentos = [
    { id: 1, cliente: "João Silva", data: "25/10/2023", horario: "10:00" },
    { id: 2, cliente: "Maria Oliveira", data: "26/10/2023", horario: "14:00" },
    { id: 3, cliente: "Carlos Souza", data: "27/10/2023", horario: "16:00" },
  ];

  const comissaoSemanal = 1200;
  const agendamentosRestantes = 5; 

  return (
    <section className="min-h-screen bg-gradient-to-b from-[#643f23] to-[#ffecb9] p-4">
      <header className="bg-marrom-escuro text-claro p-4 rounded-lg mb-6">
        <div className="container mx-auto flex justify-between items-center">
          <img
            src={Logo}
            alt="Logo"
            className="w-12 h-12"
          />
          <nav>
            <ul className="flex space-x-4">
              <li>
                <a href="#" className="hover:text-areia transition-colors">
                  Início
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-areia transition-colors">
                  Perfil
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-areia transition-colors">
                  Sair
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </header>

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
                  <button className="bg-areia text-marrom-escuro px-4 py-2 rounded-lg hover:bg-pele transition-colors">
                    Detalhes
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </section>
  );
};