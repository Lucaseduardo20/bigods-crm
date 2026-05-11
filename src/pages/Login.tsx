import React, { useState } from 'react';
import { useAuth } from '../contexts/UserContext';
import { useNavigate } from 'react-router-dom';
import { NotifyType } from '../types/global';
import { toast, ToastContainer } from 'react-toastify';


export const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();
    const notify: NotifyType = (type, message) => {
      toast[type](message);
    };


    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        try {
          const response = await login({ email, password });
          
          if (response && response.status === 200) {
            notify('success', 'Login efetuado com sucesso!');
            setTimeout(() => {
              navigate('/home');
              setLoading(false);
            }, 2000);
          } else if (response && response.status === 401) {
            notify('error', 'Email ou senha invalidos.');
            setLoading(false);
          } else {
            notify('error', 'Nao foi possivel entrar no painel.');
            setLoading(false);
          }
        } catch {
          notify('error', 'Erro inesperado ao entrar.');
          setLoading(false);
        }
      };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#643f23] to-[#ffecb9] p-4">
      <article className="w-full max-w-md bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="bg-marrom-escuro p-6">
          <p className="text-center text-3xl font-bold text-claro">Bigods</p>
          <p className="text-center text-sm text-areia">Painel da barbearia</p>
        </div>

        <div className="p-6">
          <h2 className="text-2xl font-bold text-marrom-escuro mb-4">Login</h2>
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label htmlFor="username" className="block text-marrom-claro text-sm font-bold mb-2">
                Usuário
              </label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="text"
                id="username"
                className="w-full px-3 py-2 border border-cinza-paleta rounded-lg focus:outline-none focus:ring-2 focus:ring-areia"
                placeholder="email@barbearia.com"
              />
            </div>

            <div className="mb-6">
              <label htmlFor="password" className="block text-marrom-claro text-sm font-bold mb-2">
                Senha
              </label>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                id="password"
                className="w-full px-3 py-2 border border-cinza-paleta rounded-lg focus:outline-none focus:ring-2 focus:ring-areia"
                placeholder="Digite sua senha"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-areia text-marrom-escuro font-bold py-2 px-4 rounded-lg hover:cursor-pointer hover:bg-pele transition-hover"
            >
              {!loading ? 'Entrar' : 'Carregando...'}
            </button>
          </form>
        </div>
      </article>
      <ToastContainer />
    </section>
  );
};
