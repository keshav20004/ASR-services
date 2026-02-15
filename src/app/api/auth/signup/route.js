import { NextResponse } from 'next/server';
import prisma from '@/lib/db';

export async function POST(request) {
    try {
        const body = await request.json();
        const { email, password, name, role, company, skills } = body;

        if (!email || !password || !name || !role) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        // Check if user already exists
        const existing = await prisma.user.findUnique({ where: { email } });
        if (existing) {
            return NextResponse.json({ error: 'User already exists' }, { status: 409 });
        }

        const user = await prisma.user.create({
            data: { email, password, name, role, company, skills },
        });

        return NextResponse.json({
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
            company: user.company,
            skills: user.skills,
        });
    } catch (error) {
        console.error('Signup error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
