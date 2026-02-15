'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Navbar from '@/components/Navbar';
import Modal from '@/components/Modal';
import WhatsAppButton from '@/components/WhatsAppButton';
import {
    getUser,
    getJobs,
    addJob,
    deleteJob,
    getApplicationsByJob,
    seedIfNeeded,
} from '@/lib/store';

export default function RecruiterDashboard() {
    const [user, setUserState] = useState(null);
    const [jobs, setJobs] = useState([]);
    const [allApplications, setAllApplications] = useState({});
    const [showPostModal, setShowPostModal] = useState(false);
    const [expandedJob, setExpandedJob] = useState(null);
    const [form, setForm] = useState({
        title: '',
        company: '',
        location: '',
        type: 'Full-time',
        salaryMin: '',
        salaryMax: '',
        description: '',
        requirements: '',
    });
    const chartRef = useRef(null);
    const chartInstance = useRef(null);

    const loadData = useCallback(() => {
        seedIfNeeded();
        const u = getUser();
        if (!u || u.role !== 'recruiter') {
            window.location.href = '/login/recruiter';
            return;
        }
        setUserState(u);
        const allJobs = getJobs();
        const myJobs = allJobs.filter((j) => j.postedBy === u.email);
        setJobs(myJobs);

        const appMap = {};
        myJobs.forEach((j) => {
            appMap[j.id] = getApplicationsByJob(j.id);
        });
        setAllApplications(appMap);
    }, []);

    useEffect(() => {
        loadData();
    }, [loadData]);

    // Chart.js
    useEffect(() => {
        if (!chartRef.current || jobs.length === 0) return;

        const loadChart = async () => {
            const ChartModule = await import('chart.js/auto');
            const Chart = ChartModule.default;

            if (chartInstance.current) {
                chartInstance.current.destroy();
            }

            const labels = jobs.map((j) => j.title.length > 20 ? j.title.slice(0, 20) + '…' : j.title);
            const data = jobs.map((j) => (allApplications[j.id] || []).length);
            const colors = [
                'rgba(108, 92, 231, 0.7)',
                'rgba(0, 206, 201, 0.7)',
                'rgba(253, 121, 168, 0.7)',
                'rgba(253, 203, 110, 0.7)',
                'rgba(0, 184, 148, 0.7)',
                'rgba(162, 155, 254, 0.7)',
                'rgba(129, 236, 236, 0.7)',
                'rgba(225, 112, 85, 0.7)',
            ];

            chartInstance.current = new Chart(chartRef.current, {
                type: 'doughnut',
                data: {
                    labels: labels,
                    datasets: [
                        {
                            data: data,
                            backgroundColor: colors.slice(0, data.length),
                            borderColor: 'rgba(18, 18, 42, 1)',
                            borderWidth: 3,
                        },
                    ],
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    cutout: '65%',
                    plugins: {
                        legend: {
                            position: 'bottom',
                            labels: {
                                color: 'rgba(245, 246, 250, 0.6)',
                                padding: 16,
                                usePointStyle: true,
                                font: { family: 'Inter', size: 11 },
                            },
                        },
                    },
                },
            });
        };

        loadChart();

        return () => {
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }
        };
    }, [jobs, allApplications]);

    const totalApps = Object.values(allApplications).reduce(
        (sum, apps) => sum + apps.length,
        0
    );

    const handlePost = (e) => {
        e.preventDefault();
        const newJob = {
            ...form,
            salaryMin: parseInt(form.salaryMin) || 0,
            salaryMax: parseInt(form.salaryMax) || 0,
            postedBy: user.email,
            company: form.company || user.company,
        };
        addJob(newJob);
        setShowPostModal(false);
        setForm({
            title: '',
            company: '',
            location: '',
            type: 'Full-time',
            salaryMin: '',
            salaryMax: '',
            description: '',
            requirements: '',
        });
        loadData();
    };

    const handleDelete = (id) => {
        if (confirm('Delete this job listing?')) {
            deleteJob(id);
            loadData();
        }
    };

    if (!user) return null;

    return (
        <div className="page-wrapper">
            <Navbar role="recruiter" userName={user.name} />

            <div className="page-content">
                {/* Welcome */}
                <div className="animate-fade-in" style={{ marginBottom: 'var(--gap-xl)' }}>
                    <h1 style={{ fontSize: '28px', fontWeight: 800, marginBottom: '4px' }}>
                        Welcome back,{' '}
                        <span
                            style={{
                                background: 'var(--gradient-primary)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundClip: 'text',
                            }}
                        >
                            {user.name}
                        </span>{' '}
                        👋
                    </h1>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>
                        Here&apos;s an overview of your recruitment activity.
                    </p>
                </div>

                {/* KPI Row */}
                <div className="kpi-row animate-slide-up">
                    <div className="glass-card kpi-card">
                        <div className="kpi-icon">📋</div>
                        <div className="kpi-value">{jobs.length}</div>
                        <div className="kpi-label">Jobs Posted</div>
                    </div>
                    <div className="glass-card kpi-card">
                        <div className="kpi-icon">📬</div>
                        <div className="kpi-value">{totalApps}</div>
                        <div className="kpi-label">Total Applications</div>
                    </div>
                    <div className="glass-card kpi-card">
                        <div className="kpi-icon">✅</div>
                        <div className="kpi-value">{jobs.filter((j) => j.status === 'active').length}</div>
                        <div className="kpi-label">Active Listings</div>
                    </div>
                    <div className="glass-card kpi-card">
                        <div className="kpi-icon">📊</div>
                        <div className="kpi-value">
                            {jobs.length > 0 ? Math.round(totalApps / jobs.length) : 0}
                        </div>
                        <div className="kpi-label">Avg. Per Job</div>
                    </div>
                </div>

                {/* Chart + Post button row */}
                <div
                    className="animate-slide-up delay-1"
                    style={{
                        display: 'grid',
                        gridTemplateColumns: jobs.length > 0 ? '1fr 1fr' : '1fr',
                        gap: 'var(--gap-lg)',
                        marginBottom: 'var(--gap-xl)',
                    }}
                >
                    {jobs.length > 0 && (
                        <div className="glass-card" style={{ padding: 'var(--gap-lg)' }}>
                            <h3
                                style={{
                                    fontSize: '15px',
                                    fontWeight: 600,
                                    marginBottom: 'var(--gap-md)',
                                    color: 'var(--text-secondary)',
                                }}
                            >
                                📊 Application Distribution
                            </h3>
                            <div style={{ height: '250px', position: 'relative' }}>
                                <canvas ref={chartRef} />
                            </div>
                        </div>
                    )}

                    <div
                        className="glass-card"
                        style={{
                            padding: 'var(--gap-xl)',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            textAlign: 'center',
                            gap: 'var(--gap-md)',
                            cursor: 'pointer',
                            minHeight: '200px',
                        }}
                        onClick={() => setShowPostModal(true)}
                    >
                        <div
                            style={{
                                width: '64px',
                                height: '64px',
                                borderRadius: '50%',
                                background: 'var(--gradient-primary)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '28px',
                            }}
                        >
                            +
                        </div>
                        <h3 style={{ fontSize: '18px', fontWeight: 700 }}>Post a New Job</h3>
                        <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
                            Create a new listing and reach thousands of candidates
                        </p>
                    </div>
                </div>

                {/* My Job Listings */}
                <div className="section-header animate-slide-up delay-2">
                    <h2 className="section-title">My Job Listings</h2>
                    <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
                        {jobs.length} listing{jobs.length !== 1 ? 's' : ''}
                    </span>
                </div>

                {jobs.length === 0 ? (
                    <div className="glass-card empty-state animate-slide-up delay-2">
                        <div className="empty-state-icon">📝</div>
                        <div className="empty-state-text">
                            You haven&apos;t posted any jobs yet. Create your first listing!
                        </div>
                        <button className="btn btn-primary" onClick={() => setShowPostModal(true)}>
                            Post Your First Job
                        </button>
                    </div>
                ) : (
                    <div className="job-grid animate-slide-up delay-2">
                        {jobs.map((job) => (
                            <div key={job.id} className="glass-card job-card" style={{ cursor: 'default' }}>
                                <div className="job-card-header">
                                    <div>
                                        <div className="job-card-title">{job.title}</div>
                                        <div className="job-card-company">{job.company}</div>
                                    </div>
                                    <span className={`badge ${job.status === 'active' ? 'badge-green' : 'badge-red'}`}>
                                        {job.status}
                                    </span>
                                </div>

                                <div className="job-card-meta">
                                    <span className="badge badge-primary">📍 {job.location}</span>
                                    <span className="badge badge-teal">⏰ {job.type}</span>
                                </div>

                                <div className="job-card-salary">
                                    ${(job.salaryMin / 1000).toFixed(0)}K – ${(job.salaryMax / 1000).toFixed(0)}K
                                </div>

                                <div className="job-card-desc">{job.description}</div>

                                <div className="job-card-footer">
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <span
                                            style={{
                                                fontSize: '13px',
                                                color: 'var(--accent-secondary)',
                                                fontWeight: 600,
                                            }}
                                        >
                                            {(allApplications[job.id] || []).length} Applicant
                                            {(allApplications[job.id] || []).length !== 1 ? 's' : ''}
                                        </span>
                                        {(allApplications[job.id] || []).length > 0 && (
                                            <button
                                                className="btn btn-outline btn-sm"
                                                onClick={() =>
                                                    setExpandedJob(expandedJob === job.id ? null : job.id)
                                                }
                                            >
                                                {expandedJob === job.id ? 'Hide' : 'View'}
                                            </button>
                                        )}
                                    </div>
                                    <div style={{ display: 'flex', gap: '8px' }}>
                                        <span className="job-card-date">📅 {job.postedDate}</span>
                                        <button
                                            className="btn btn-danger btn-sm"
                                            onClick={() => handleDelete(job.id)}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>

                                {/* Applicants expanded */}
                                {expandedJob === job.id && (allApplications[job.id] || []).length > 0 && (
                                    <div
                                        style={{
                                            borderTop: '1px solid var(--border-glass)',
                                            paddingTop: 'var(--gap-md)',
                                            animation: 'slideDown 0.3s var(--ease)',
                                        }}
                                    >
                                        <h4
                                            style={{
                                                fontSize: '13px',
                                                fontWeight: 600,
                                                color: 'var(--text-secondary)',
                                                marginBottom: 'var(--gap-sm)',
                                                textTransform: 'uppercase',
                                                letterSpacing: '0.8px',
                                            }}
                                        >
                                            Applicants
                                        </h4>
                                        {(allApplications[job.id] || []).map((app) => (
                                            <div key={app.id} className="applicant-row">
                                                <div className="applicant-info">
                                                    <span className="applicant-name">{app.applicantName}</span>
                                                    <span className="applicant-email">{app.applicantEmail}</span>
                                                    {app.coverLetter && (
                                                        <p
                                                            style={{
                                                                fontSize: '12px',
                                                                color: 'var(--text-muted)',
                                                                marginTop: '4px',
                                                                fontStyle: 'italic',
                                                            }}
                                                        >
                                                            &ldquo;{app.coverLetter.slice(0, 100)}
                                                            {app.coverLetter.length > 100 ? '…' : ''}&rdquo;
                                                        </p>
                                                    )}
                                                </div>
                                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '4px' }}>
                                                    <span className={`badge badge-orange`}>{app.status}</span>
                                                    <span className="applicant-date">{app.appliedDate}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Post Job Modal */}
            <Modal
                isOpen={showPostModal}
                onClose={() => setShowPostModal(false)}
                title="Post a New Job"
            >
                <form onSubmit={handlePost}>
                    <div className="form-grid" style={{ gap: '14px' }}>
                        <div className="input-group">
                            <label>Job Title *</label>
                            <input
                                className="input-field"
                                placeholder="e.g. Senior React Developer"
                                value={form.title}
                                onChange={(e) => setForm({ ...form, title: e.target.value })}
                                required
                            />
                        </div>
                        <div className="form-grid form-grid-2">
                            <div className="input-group">
                                <label>Company</label>
                                <input
                                    className="input-field"
                                    placeholder={user?.company || 'Company name'}
                                    value={form.company}
                                    onChange={(e) => setForm({ ...form, company: e.target.value })}
                                />
                            </div>
                            <div className="input-group">
                                <label>Location *</label>
                                <input
                                    className="input-field"
                                    placeholder="e.g. San Francisco, CA"
                                    value={form.location}
                                    onChange={(e) => setForm({ ...form, location: e.target.value })}
                                    required
                                />
                            </div>
                        </div>
                        <div className="form-grid form-grid-2">
                            <div className="input-group">
                                <label>Job Type</label>
                                <select
                                    className="input-field"
                                    value={form.type}
                                    onChange={(e) => setForm({ ...form, type: e.target.value })}
                                >
                                    <option>Full-time</option>
                                    <option>Part-time</option>
                                    <option>Contract</option>
                                    <option>Remote</option>
                                    <option>Hybrid</option>
                                    <option>Internship</option>
                                </select>
                            </div>
                            <div className="form-grid form-grid-2">
                                <div className="input-group">
                                    <label>Min Salary ($)</label>
                                    <input
                                        className="input-field"
                                        type="number"
                                        placeholder="80000"
                                        value={form.salaryMin}
                                        onChange={(e) => setForm({ ...form, salaryMin: e.target.value })}
                                    />
                                </div>
                                <div className="input-group">
                                    <label>Max Salary ($)</label>
                                    <input
                                        className="input-field"
                                        type="number"
                                        placeholder="120000"
                                        value={form.salaryMax}
                                        onChange={(e) => setForm({ ...form, salaryMax: e.target.value })}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="input-group">
                            <label>Description *</label>
                            <textarea
                                className="input-field"
                                placeholder="Describe the role, responsibilities, and what you're looking for..."
                                value={form.description}
                                onChange={(e) => setForm({ ...form, description: e.target.value })}
                                required
                                rows={4}
                            />
                        </div>
                        <div className="input-group">
                            <label>Requirements</label>
                            <input
                                className="input-field"
                                placeholder="e.g. React, TypeScript, 5+ years experience"
                                value={form.requirements}
                                onChange={(e) => setForm({ ...form, requirements: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="form-actions">
                        <button
                            type="button"
                            className="btn btn-outline"
                            onClick={() => setShowPostModal(false)}
                        >
                            Cancel
                        </button>
                        <button type="submit" className="btn btn-primary">
                            ✨ Post Job
                        </button>
                    </div>
                </form>
            </Modal>

            <WhatsAppButton />
        </div>
    );
}
