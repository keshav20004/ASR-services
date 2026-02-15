import { NextResponse } from 'next/server';
import prisma from '@/lib/db';

// DELETE a job by ID
export async function DELETE(request, { params }) {
    try {
        const id = parseInt(params.id);

        // Delete related applications first
        await prisma.application.deleteMany({ where: { jobId: id } });

        await prisma.job.delete({ where: { id } });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Delete job error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
