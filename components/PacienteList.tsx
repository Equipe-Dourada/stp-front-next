'use client';
import { Paciente } from '@/types/Paciente';

interface PacienteListProps {
    pacientes: Paciente[];
    onDelete: (id: string) => void;
    onEdit: (paciente: Paciente) => void;
}

const PacienteList: React.FC<PacienteListProps> = ({ pacientes, onDelete, onEdit }) => (
    <ul className="space-y-4">
        {pacientes.map((paciente) => (
            <li key={paciente.id} className="border p-4 rounded shadow">
                <div className="flex justify-between items-center">
                    <div>
                        <span className="font-bold">{paciente.nome}</span> ({paciente.cpf}) - {paciente.idade} anos
                    </div>
                    <div className="space-x-2">
                        <button onClick={() => onEdit(paciente)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Editar</button>
                        <button onClick={() => onDelete(paciente.id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Deletar</button>
                    </div>
                </div>
            </li>
        ))}
    </ul>
);

export default PacienteList;
