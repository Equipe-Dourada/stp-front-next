'use client';
import { useState, useEffect } from 'react';
import PacienteList from '@/components/PacienteList';
import PacienteForm from '@/components/PacienteForm';
import { Paciente } from '@/types/Paciente';
import Link from 'next/link';
import MenuLateral from '@/components/MenuLateral';

export default function Pacientes() {
  const [pacientes, setPacientes] = useState<Paciente[]>([]);
  const [editingPaciente, setEditingPaciente] = useState<Paciente | undefined>(undefined);
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    fetchPacientes();
  }, []);

  const fetchPacientes = async () => {
    const res = await fetch('/api/pacientes');
    const data = await res.json();
    setPacientes(data);
  };

  const handleCreate = async (pacienteData: Omit<Paciente, 'id'>) => {
    const res = await fetch('/api/pacientes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(pacienteData),
    });

    if (res.ok) {
      await fetchPacientes();
      setIsCreating(false);
    } else {
      alert('Erro ao criar o paciente.');
    }
  };

  const handleUpdate = async (pacienteData: Paciente) => {
    const res = await fetch(`/api/pacientes/${pacienteData.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(pacienteData),
    });

    if (res.ok) {
      await fetchPacientes();
      setEditingPaciente(undefined);
    } else {
      alert('Erro ao atualizar o paciente.');
    }
  };

  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm('Tem certeza que deseja deletar este paciente?');
    if (confirmDelete) {
      const res = await fetch(`/api/pacientes/${id}`, { method: 'DELETE' });
      if (res.ok) {
        await fetchPacientes();
      } else {
        alert('Erro ao deletar o paciente.');
      }
    }
  };

  return (
    <div className="flex h-screen">
      {/* Menu Lateral */}
      <MenuLateral />

      {/* Conteúdo Principal */}
      <div className="flex-1 container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Pacientes</h1>

        <div className="mb-4 space-x-2">
          {!isCreating && !editingPaciente && (
            <>
              <button
                onClick={() => setIsCreating(true)}
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
              >
                Novo Paciente
              </button>
            </>
          )}
          {(isCreating || editingPaciente) && (
            <PacienteForm
              onSubmit={(pacienteData) => {
                if (editingPaciente) {
                  handleUpdate({ ...pacienteData, id: editingPaciente.id });
                } else {
                  handleCreate(pacienteData);
                }
              }}
              initialValues={editingPaciente}
              onCancel={() => {
                setIsCreating(false);
                setEditingPaciente(undefined);
              }}
            />
          )}
        </div>

        {pacientes.length > 0 ? (
          <PacienteList pacientes={pacientes} onDelete={handleDelete} onEdit={setEditingPaciente} />
        ) : (
          <p>Nenhum paciente cadastrado.</p>
        )}
      </div>
    </div>
  );
}
