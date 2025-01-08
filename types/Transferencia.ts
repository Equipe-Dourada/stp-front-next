import { Paciente } from "./Paciente";

export interface Transferencia {
    paciente: Paciente | null;
    medicoOrigem: string;
    medicoDestino: string;
    horarioSaida: Date | null;
    previsaoChegada: Date | null;
    distancia: number;
    meioTransporte: 'AMBULANCIA' | 'HELICOPTERO' | 'AVIAO';
}
