'use client';
import { useState, useEffect } from 'react';
import { Paciente } from '@/types/Paciente';
import { Transferencia } from '@/types/Transferencia';
import Link from 'next/link';
import MenuLateral from '@/components/MenuLateral'; // Importar o menu lateral

const medicos = ['Dr. Souza', 'Dr. Oliveira', 'Dr. Silva', 'Dra. Pereira'];

export default function TransferenciaPage() {
    const [pacientes, setPacientes] = useState<Paciente[]>([]);
    const [transferencia, setTransferencia] = useState<Transferencia>({
        paciente: null,
        medicoOrigem: '',
        medicoDestino: '',
        horarioSaida: null,
        previsaoChegada: null,
        distancia: 0,
        meioTransporte: 'AMBULANCIA',
    });

    useEffect(() => {
        const fetchPacientes = async () => {
            const res = await fetch('/api/pacientes');
            const data = await res.json();
            setPacientes(data);
        };

        fetchPacientes();
    }, []);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setTransferencia({ ...transferencia, [event.target.name]: event.target.value });
    };

    const handlePacienteChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedPaciente = pacientes.find(p => p.id === event.target.value) || null;
        setTransferencia({ ...transferencia, paciente: selectedPaciente });
    };

    const handleDateChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setTransferencia({
            ...transferencia,
            [event.target.name]: event.target.value ? new Date(event.target.value) : null,
        });
    };

    const handleConfirmarTransferencia = () => {
        if (transferencia.paciente && transferencia.medicoOrigem && transferencia.medicoDestino && transferencia.horarioSaida && transferencia.previsaoChegada) {
            alert('Transferência confirmada!');
            console.log(transferencia);
            setTransferencia({
                paciente: null,
                medicoOrigem: '',
                medicoDestino: '',
                horarioSaida: null,
                previsaoChegada: null,
                distancia: 0,
                meioTransporte: 'AMBULANCIA',
            });
        } else {
            alert('Por favor, preencha todos os campos.');
        }
    };

    return (
        <div className="flex h-screen">
            {/* Menu Lateral */}
            <MenuLateral />

            {/* Conteúdo Principal */}
            <div className="flex-1 p-6 bg-gray-900 text-white overflow-auto">
                <h1 className="text-2xl font-bold mb-4">Nova Transferência</h1>

                <div className="space-y-4">
                    {/* Seletor de Paciente */}
                    <div>
                        <label htmlFor="paciente" className="block text-gray-300 font-bold mb-2">Paciente:</label>
                        <select
                            id="paciente"
                            name="paciente"
                            value={transferencia.paciente?.id || ''}
                            onChange={handlePacienteChange}
                            className="border rounded w-full py-2 px-3 bg-gray-700 text-white"
                        >
                            <option value="">Selecione um paciente</option>
                            {pacientes.map((paciente) => (
                                <option key={paciente.id} value={paciente.id}>{paciente.nome}</option>
                            ))}
                        </select>
                    </div>

                    {/* Seletor de Médico de Origem */}
                    <div>
                        <label htmlFor="medicoOrigem" className="block text-gray-300 font-bold mb-2">Médico de Origem:</label>
                        <select
                            id="medicoOrigem"
                            name="medicoOrigem"
                            value={transferencia.medicoOrigem}
                            onChange={handleInputChange}
                            className="border rounded w-full py-2 px-3 bg-gray-700 text-white"
                        >
                            <option value="">Selecione um médico</option>
                            {medicos.map((medico) => (
                                <option key={medico} value={medico}>{medico}</option>
                            ))}
                        </select>
                    </div>

                    {/* Seletor de Médico de Destino */}
                    <div>
                        <label htmlFor="medicoDestino" className="block text-gray-300 font-bold mb-2">Médico de Destino:</label>
                        <select
                            id="medicoDestino"
                            name="medicoDestino"
                            value={transferencia.medicoDestino}
                            onChange={handleInputChange}
                            className="border rounded w-full py-2 px-3 bg-gray-700 text-white"
                        >
                            <option value="">Selecione um médico</option>
                            {medicos.map((medico) => (
                                <option key={medico} value={medico}>{medico}</option>
                            ))}
                        </select>
                    </div>

                    {/* Horário de Saída */}
                    <div>
                        <label htmlFor="horarioSaida" className="block text-gray-300 font-bold mb-2">Horário de Saída:</label>
                        <input
                            type="datetime-local"
                            id="horarioSaida"
                            name="horarioSaida"
                            value={transferencia.horarioSaida ? transferencia.horarioSaida.toISOString().slice(0, 16) : ''}
                            onChange={handleDateChange}
                            className="border rounded w-full py-2 px-3 bg-gray-700 text-white"
                        />
                    </div>

                    {/* Previsão de Chegada */}
                    <div>
                        <label htmlFor="previsaoChegada" className="block text-gray-300 font-bold mb-2">Previsão de Chegada:</label>
                        <input
                            type="datetime-local"
                            id="previsaoChegada"
                            name="previsaoChegada"
                            value={transferencia.previsaoChegada ? transferencia.previsaoChegada.toISOString().slice(0, 16) : ''}
                            onChange={handleDateChange}
                            className="border rounded w-full py-2 px-3 bg-gray-700 text-white"
                        />
                    </div>

                    {/* Distância */}
                    <div>
                        <label htmlFor="distancia" className="block text-gray-300 font-bold mb-2">Distância (km):</label>
                        <input
                            type="number"
                            id="distancia"
                            name="distancia"
                            value={transferencia.distancia}
                            onChange={handleInputChange}
                            className="border rounded w-full py-2 px-3 bg-gray-700 text-white"
                        />
                    </div>

                    {/* Meio de Transporte */}
                    <div>
                        <label htmlFor="meioTransporte" className="block text-gray-300 font-bold mb-2">Meio de Transporte:</label>
                        <select
                            id="meioTransporte"
                            name="meioTransporte"
                            value={transferencia.meioTransporte}
                            onChange={handleInputChange}
                            className="border rounded w-full py-2 px-3 bg-gray-700 text-white"
                        >
                            <option value="AMBULANCIA">Ambulância</option>
                            <option value="HELICOPTERO">Helicóptero</option>
                            <option value="AVIAO">Avião</option>
                        </select>
                    </div>

                    {/* Botões de Ação */}
                    <div className="space-x-2">
                        <button
                            onClick={handleConfirmarTransferencia}
                            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4"
                        >
                            Confirmar Transferência
                        </button>

                        <Link href="/pacientes">
                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                Voltar para Pacientes
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
