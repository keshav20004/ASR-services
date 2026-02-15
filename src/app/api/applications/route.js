import { NextResponse } from 'next/server';
import prisma from '@/lib/db';

// POST create application
export async function POST(request) {
    try {
        const body = await request.json();
        const { jobId, jobTitle, jobCompany, applicantEmail, applicantName, applicantSkills, coverLetter } = body;

        if (!jobId || !applicantEmail || !applicantName) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        // Check if already applied
        const existing = await prisma.application.findFirst({
            where: { jobId: parseInt(jobId), applicantEmail },
        });
        if (existing) {
            return NextResponse.json({ error: 'Already applied to this job' }, { status: 409 });
        }

        const application = await prisma.application.create({
            data: {
                jobId: parseInt(jobId),
                jobTitle: jobTitle || '',
                jobCompany: jobCompany || '',
                applicantEmail,
                applicantName,
                applicantSkills: applicantSkills || '',
                coverLetter: coverLetter || '',
                appliedDate: new Date().toISOString().split('T')[0],
                status: 'Pending',
            },
        });

        return NextResponse.json(application);
    } catch (error) {
        console.error('Create application error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

// GET applications — by user email or job ID
export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const userEmail = searchParams.get('userEmail');
        const jobId = searchParams.get('jobId');

        let where = {};
        if (userEmail) where.applicantEmail = userEmail;
        if (jobId) where.jobId = parseInt(jobId);

        const applications = await prisma.application.findMany({
            where,
            orderBy: { createdAt: 'desc' },
        });

        return NextResponse.json(applications);
    } catch (error) {
        console.error('Get applications error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
