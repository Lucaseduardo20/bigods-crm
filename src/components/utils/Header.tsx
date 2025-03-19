import { useState } from 'react';
import Logo from '../../assets/logo-light-sem-subtitulo.png'
import { FaBars, FaTimes } from 'react-icons/fa';


export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full bg-marrom-escuro text-claro p-4 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <img
          src={Logo}
          alt="Logo"
          className="w-12 h-12"
        />

        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="text-claro hover:text-areia transition-colors md:hidden"
        >
          {isMenuOpen ? <FaTimes size={32} /> : <FaBars size={32} />}
        </button>

        <nav className="hidden md:block">
          <ul className="flex space-x-4">
            <li>
              <a href="/home" className="hover:text-areia transition-colors">
                Início
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-areia transition-colors">
                Agendamentos
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

      <nav
        className={`md:hidden fixed top-16 right-0 h-full bg-claro w-64 p-4 transform transition-transform duration-300 ease-in-out ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
      >
        <ul className="flex flex-col space-y-4">
          <li>
            <a href="/home" className="text-marrom-escuro hover:text-areia transition-colors">
              Início
            </a>
          </li>
          <li>
            <a href="/appointments" className="text-marrom-escuro hover:text-areia transition-colors">
              Agendamentos
            </a>
          </li>
          <li>
            <a href="#" className="text-marrom-escuro hover:text-areia transition-colors">
              Perfil
            </a>
          </li>
          <li>
            <a href="#" className="text-marrom-escuro hover:text-areia transition-colors">
              Sair
            </a>
          </li>
        </ul>
      </nav>
    </header>
  )
}