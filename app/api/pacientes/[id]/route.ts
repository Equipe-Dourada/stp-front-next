import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: Request, { params }: { params: { id: string } }) {
    try {
        const paciente = await prisma.paciente.findUnique({ where: { id: params.id } });
        if (!paciente) {
            return NextResponse.json({ error: "Paciente não encontrado" }, { status: 404 });
        }
        return NextResponse.json({ ...paciente, id: paciente.id.toString() });
    } catch (error) {
        console.error("Erro ao processar:", error);
        return NextResponse.json({ error: "Erro ao buscar paciente" }, { status: 500 });
    }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
    try {
        const data = await request.json();
        const paciente = await prisma.paciente.update({
            where: { id: params.id },
            data
        });
        return NextResponse.json({ ...paciente, id: paciente.id.toString() });
    } catch (error) {
        console.error("Erro ao processar:", error);
        return NextResponse.json({ error: "Erro ao atualizar paciente" }, { status: 500 });
    }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    try {
        await prisma.paciente.delete({ where: { id: params.id } });
        return NextResponse.json({ message: 'Paciente deletado' });
    } catch (error) {
        console.error("Erro ao processar:", error);
        return NextResponse.json({ error: "Erro ao deletar paciente" }, { status: 500 });
    }
}
