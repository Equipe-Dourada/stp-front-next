'use client';
import { useState } from 'react';
import { Paciente } from '@/types/Paciente';

interface PacienteFormProps {
    onSubmit: (paciente: Omit<Paciente, 'id'>) => void;
    initialValues?: Paciente;
    onCancel?: () => void;
}

const PacienteForm: React.FC<PacienteFormProps> = ({ onSubmit, initialValues, onCancel }) => {
    const [paciente, setPaciente] = useState<Omit<Paciente, 'id'>>(initialValues || { cpf: '', nome: '', idade: 0 });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setPaciente({ ...paciente, [name]: name === 'idade' ? Number(value) : value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(paciente);
        setPaciente({ cpf: '', nome: '', idade: 0 });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <input type="text" name="cpf" placeholder="CPF" value={paciente.cpf} onChange={handleChange}
                   className="border p-2 rounded w-full text-gray-800"/>
            <input type="text" name="nome" placeholder="Nome" value={paciente.nome} onChange={handleChange}
                   className="border p-2 rounded w-full text-gray-800"/>
            <input type="number" name="idade" placeholder="Idade" value={paciente.idade} onChange={handleChange}
                   className="border p-2 rounded w-full text-gray-800"/>
            <div className="flex justify-end space-x-2">
                {onCancel && <button type="button" onClick={onCancel}
                                     className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">Cancelar</button>}
                <button type="submit"
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Salvar
                </button>
            </div>
        </form>
    );
};

export default PacienteForm;
