'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function MenuLateral() {
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const router = useRouter();

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  return (
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
          onClick={() => handleNavigation('/layout')}
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
          onClick={() => handleNavigation('/transferencia')}
          className="cursor-pointer p-2 rounded hover:bg-gray-700"
        >
          {isMenuOpen && 'Transferências'}
          {!isMenuOpen && '🔄'}
        </li>
      </ul>
    </div>
  );
}
