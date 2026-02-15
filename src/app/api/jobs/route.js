import { NextResponse } from 'next/server';
import prisma from '@/lib/db';

// GET all active jobs
export async function GET() {
    try {
        const jobs = await prisma.job.findMany({
            orderBy: { createdAt: 'desc' },
        });
        return NextResponse.json(jobs);
    } catch (error) {
        console.error('Get jobs error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

// POST create a new job
export async function POST(request) {
    try {
        const body = await request.json();
        const { title, company, location, type, salaryMin, salaryMax, currency, description, requirements, postedBy } = body;

        if (!title || !location || !description || !postedBy) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const job = await prisma.job.create({
            data: {
                title,
                company: company || '',
                location,
                type: type || 'Full-time',
                salaryMin: parseInt(salaryMin) || 0,
                salaryMax: parseInt(salaryMax) || 0,
                currency: currency || 'INR',
                description,
                requirements: requirements || '',
                postedBy,
                postedDate: new Date().toISOString().split('T')[0],
                status: 'active',
            },
        });

        return NextResponse.json(job);
    } catch (error) {
        console.error('Create job error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
