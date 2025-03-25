import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { FaSignOutAlt, FaEdit } from "react-icons/fa";
import { Header } from "../components/utils/Header";
import { toast } from "react-toastify";
import defaultAvatar from '../assets/logo-classico-sem-subtitulo.jpg';

export const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = () => {
    logout();
    toast.success("Logout realizado com sucesso!");
    navigate("/");
  };

  return (
    <section className="min-h-screen bg-gradient-to-b from-[#643f23] to-[#ffecb9] p-4 pt-24">
      <Header />
      
      <main className="container mx-auto max-w-md">
        <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
          <div className="flex flex-col items-center mb-6">
            <div className="relative mb-4">
              <img 
                src={user?.photo || defaultAvatar} 
                alt="Foto do barbeiro" 
                className="w-32 h-32 rounded-full object-cover border-4 border-pele"
              />
              <button className="absolute bottom-0 right-0 bg-areia p-2 rounded-full hover:bg-pele transition-colors">
                <FaEdit className="text-marrom-escuro" />
              </button>
            </div>
            
            <h1 className="text-2xl font-bold text-marrom-escuro text-center">
              {user?.name || "Barbeiro"}
            </h1>
            <p className="text-marrom-claro mb-2">{user?.role || "Cargo"}</p>
            <p className="text-marrom-escuro font-medium">
              {user?.company_name || "Barbearia não vinculada"}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-pele p-3 rounded-lg text-center">
              <p className="text-marrom-claro text-sm">Agendamentos</p>
              <p className="text-xl font-bold text-marrom-escuro">24</p>
            </div>
            <div className="bg-pele p-3 rounded-lg text-center">
              <p className="text-marrom-claro text-sm">Avaliação</p>
              <p className="text-xl font-bold text-marrom-escuro">4.8</p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 bg-marrom-escuro text-white py-3 px-4 rounded-lg hover:bg-marrom-claro transition-colors"
          >
            <FaSignOutAlt />
            Sair da conta
          </button>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold text-marrom-escuro mb-4">Configurações</h2>
          <ul className="space-y-3">
            <li className="flex justify-between items-center p-3 hover:bg-pele rounded-lg transition-colors">
              <span className="text-marrom-escuro">Notificações</span>
              <span className="text-marrom-claro">Ativadas</span>
            </li>
            <li className="flex justify-between items-center p-3 hover:bg-pele rounded-lg transition-colors">
              <span className="text-marrom-escuro">Tema</span>
              <span className="text-marrom-claro">Claro</span>
            </li>
            <li className="flex justify-between items-center p-3 hover:bg-pele rounded-lg transition-colors">
              <span className="text-marrom-escuro">Idioma</span>
              <span className="text-marrom-claro">Português</span>
            </li>
          </ul>
        </div>
      </main>
    </section>
  );
};