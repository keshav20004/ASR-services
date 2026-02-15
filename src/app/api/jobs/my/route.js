import { NextResponse } from 'next/server';
import prisma from '@/lib/db';

// GET jobs posted by a specific recruiter
export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const email = searchParams.get('email');

        if (!email) {
            return NextResponse.json({ error: 'Email is required' }, { status: 400 });
        }

        const jobs = await prisma.job.findMany({
            where: { postedBy: email },
            orderBy: { createdAt: 'desc' },
        });

        return NextResponse.json(jobs);
    } catch (error) {
        console.error('Get my jobs error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
