import React, { useState } from 'react';
import LogoLight from '../assets/logo-light.png'
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';


export const Login: React.FC = () => {
    const [email, setEmail] = useState('gabriel@teste.com');
    const [password, setPassword] = useState('123123');
    const [loginStatus, setLoginStatus] = useState<number>();
    const [loading, setLoading] = useState(false);
    const { login, isAuthenticated, setIsAuthenticated, setUser } = useAuth();
    const navigate = useNavigate();


    const handleLogin = async (e: any) => {
        e.preventDefault();
        setLoading(true);
        try {
          const response: any = await login({ email, password });
          
          if (response && response.status === 200) {
            setLoginStatus(response.status);
            setTimeout(() => {
              setLoading(false);
              setIsAuthenticated(true);
              setUser(response.data.user);
              localStorage.setItem('user', JSON.stringify(response.data.user));
              navigate('/home');
            }, 2000);
          } else if (response && response.status === 401) {
            setLoginStatus(401);
          } else {
            setLoginStatus(response.status || 500);
          }
        } catch (error) {
          setLoginStatus(500); 
        } finally {
          setLoading(false);
        }
      };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#643f23] to-[#ffecb9] p-4">
      <article className="w-full max-w-md bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="bg-marrom-escuro p-6">
          <img
            src={LogoLight}
            alt="Logo da Empresa"
            className="w-40 mx-auto"
          />
        </div>

        <div className="p-6">
          <h2 className="text-2xl font-bold text-marrom-escuro mb-4">Login</h2>
          <form>
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
                placeholder="Digite seu usuário"
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
              onClick={(e) => handleLogin(e)}
              className="w-full bg-areia text-marrom-escuro font-bold py-2 px-4 rounded-lg hover:cursor-pointer hover:bg-pele transition-hover"
            >
              Entrar
            </button>
          </form>
        </div>
      </article>
    </section>
  );
};