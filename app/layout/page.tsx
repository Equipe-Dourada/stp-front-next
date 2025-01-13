'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function MainPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const router = useRouter();

  // Tipando o parâmetro 'path' como string
  const handleNavigation = (path: string) => {
    router.push(path); 
  };

  return (
    <div className="flex h-screen bg-gradient-to-r from-blue-500 to-purple-600">
      {/* Menu Lateral */}
      <div
        className={`bg-gray-800 text-white p-4 transition-all duration-300 ${
          isMenuOpen ? 'w-64' : 'w-16'
        }`}
      >
        {/* Botão de ocultar/mostrar menu */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="text-white bg-transparent p-1 rounded-full hover:bg-gray-700 transition-all"
          title={isMenuOpen ? 'Ocultar menu' : 'Mostrar menu'}
        >
          {isMenuOpen ? '←' : '→'}
        </button>

        {/* Links do menu */}
        <ul className="space-y-4 mt-4">
          <li
            onClick={() => handleNavigation('/')}
            className="cursor-pointer p-2 rounded hover:bg-gray-700"
          >
            {isMenuOpen && 'Página Inicial'}
            {!isMenuOpen && '🏠'}
          </li>
          <li
            onClick={() => handleNavigation('/pacientes')}
            className="cursor-pointer p-2 rounded hover:bg-gray-700"
          >
            {isMenuOpen && 'Pacientes'}
            {!isMenuOpen && '🧑‍⚕️'}
          </li>
          <li
            onClick={() => handleNavigation('/transferencias')}
            className="cursor-pointer p-2 rounded hover:bg-gray-700"
          >
            {isMenuOpen && 'Transferências'}
            {!isMenuOpen && '🔄'}
          </li>
        </ul>
      </div>

      {/* Conteúdo Principal */}
      <div className="flex-1 p-6">
        {/* Aqui o conteúdo correspondente à rota será carregado */}
        <div className="text-white">
          <p>Navegue para as páginas usando o menu lateral.</p>
        </div>
      </div>
    </div>
  );
}
