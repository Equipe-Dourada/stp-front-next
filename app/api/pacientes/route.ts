import {NextResponse} from 'next/server';
import {PrismaClient} from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
    const pacientes = await prisma.paciente.findMany();
    return NextResponse.json(pacientes.map(paciente => ({
        ...paciente,
        id: paciente.id.toString(),
    })));
}

export async function POST(request: Request) {
    try {
        const data = await request.json();
        console.log("post - " + data);
        const paciente = await prisma.paciente.create({data});
        return NextResponse.json({...paciente, id: paciente.id.toString()}, {status: 201}); // 201 Created
    } catch (error) {
        console.error("Erro ao criar paciente:", error)
        return NextResponse.json({error: "Erro ao criar paciente"}, {status: 500});
    }
}
