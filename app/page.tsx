'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (username === 'admin' && password === '123') {
      router.push('/layout');
    } else {
      alert('Credenciais inválidas.');
    }

    setUsername('');
    setPassword('');
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-blue-500 to-purple-600">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-96 transform transition-all hover:scale-105">
        <h2 className="text-2xl font-bold mb-6 text-white text-center">Transferência de Pacientes</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-300 font-bold mb-2">
              Usuário:
            </label>
            <input
              type="text"
              id="username"
              className="border rounded w-full py-2 px-3 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Digite seu usuário"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-300 font-bold mb-2">
              Senha:
            </label>
            <input
              type="password"
              id="password"
              className="border rounded w-full py-2 px-3 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Digite sua senha"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}