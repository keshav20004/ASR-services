'use client';

import { useState, useEffect, useCallback } from 'react';
import Navbar from '@/components/Navbar';
import Modal from '@/components/Modal';
import WhatsAppButton from '@/components/WhatsAppButton';
import {
    getUser,
    getJobs,
    addApplication,
    getApplicationsByUser,
    hasApplied,
    seedIfNeeded,
} from '@/lib/store';

export default function JobSeekerDashboard() {
    const [user, setUserState] = useState(null);
    const [jobs, setJobsList] = useState([]);
    const [filteredJobs, setFilteredJobs] = useState([]);
    const [myApplications, setMyApplications] = useState([]);
    const [activeTab, setActiveTab] = useState('browse');
    const [search, setSearch] = useState('');
    const [filterType, setFilterType] = useState('all');
    const [filterLocation, setFilterLocation] = useState('all');
    const [showApplyModal, setShowApplyModal] = useState(false);
    const [selectedJob, setSelectedJob] = useState(null);
    const [coverLetter, setCoverLetter] = useState('');
    const [showJobDetail, setShowJobDetail] = useState(null);

    const loadData = useCallback(() => {
        seedIfNeeded();
        const u = getUser();
        if (!u || u.role !== 'jobseeker') {
            window.location.href = '/login/jobseeker';
            return;
        }
        setUserState(u);
        const allJobs = getJobs().filter((j) => j.status === 'active');
        setJobsList(allJobs);
        setFilteredJobs(allJobs);
        setMyApplications(getApplicationsByUser(u.email));
    }, []);

    useEffect(() => {
        loadData();
    }, [loadData]);

    // Filter logic
    useEffect(() => {
        let filtered = [...jobs];

        if (search) {
            const q = search.toLowerCase();
            filtered = filtered.filter(
                (j) =>
                    j.title.toLowerCase().includes(q) ||
                    j.company.toLowerCase().includes(q) ||
                    j.description.toLowerCase().includes(q) ||
                    j.requirements.toLowerCase().includes(q)
            );
        }

        if (filterType !== 'all') {
            filtered = filtered.filter((j) => j.type === filterType);
        }

        if (filterLocation !== 'all') {
            filtered = filtered.filter((j) => j.location === filterLocation);
        }

        setFilteredJobs(filtered);
    }, [search, filterType, filterLocation, jobs]);

    const handleApply = (job) => {
        setSelectedJob(job);
        setCoverLetter('');
        setShowApplyModal(true);
    };

    const submitApplication = (e) => {
        e.preventDefault();
        if (!selectedJob || !user) return;

        addApplication({
            jobId: selectedJob.id,
            jobTitle: selectedJob.title,
            jobCompany: selectedJob.company,
            applicantEmail: user.email,
            applicantName: user.name,
            applicantSkills: user.skills || '',
            coverLetter: coverLetter,
        });

        setShowApplyModal(false);
        setSelectedJob(null);
        setCoverLetter('');
        loadData();
    };

    const uniqueTypes = ['all', ...new Set(jobs.map((j) => j.type))];
    const uniqueLocations = ['all', ...new Set(jobs.map((j) => j.location))];

    if (!user) return null;

    return (
        <div className="page-wrapper">
            <Navbar role="jobseeker" userName={user.name} />

            <div className="page-content">
                {/* Welcome */}
                <div className="animate-fade-in" style={{ marginBottom: 'var(--gap-xl)' }}>
                    <h1 style={{ fontSize: '28px', fontWeight: 800, marginBottom: '4px' }}>
                        Hello,{' '}
                        <span
                            style={{
                                background: 'var(--gradient-secondary)',
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
                        Discover your next career opportunity.
                    </p>
                </div>

                {/* KPI Row */}
                <div className="kpi-row animate-slide-up">
                    <div className="glass-card kpi-card">
                        <div className="kpi-icon">💼</div>
                        <div className="kpi-value">{jobs.length}</div>
                        <div className="kpi-label">Jobs Available</div>
                    </div>
                    <div className="glass-card kpi-card">
                        <div className="kpi-icon">📨</div>
                        <div className="kpi-value">{myApplications.length}</div>
                        <div className="kpi-label">Applications Sent</div>
                    </div>
                    <div className="glass-card kpi-card">
                        <div className="kpi-icon">🎯</div>
                        <div className="kpi-value">{filteredJobs.length}</div>
                        <div className="kpi-label">Matching Jobs</div>
                    </div>
                    <div className="glass-card kpi-card">
                        <div className="kpi-icon">⭐</div>
                        <div className="kpi-value">{user.skills ? user.skills.split(',').length : 0}</div>
                        <div className="kpi-label">Skills Listed</div>
                    </div>
                </div>

                {/* Tabs */}
                <div className="tabs animate-slide-up delay-1">
                    <button
                        className={`tab ${activeTab === 'browse' ? 'active' : ''}`}
                        onClick={() => setActiveTab('browse')}
                    >
                        Browse Jobs
                    </button>
                    <button
                        className={`tab ${activeTab === 'applications' ? 'active' : ''}`}
                        onClick={() => setActiveTab('applications')}
                    >
                        My Applications ({myApplications.length})
                    </button>
                </div>

                {activeTab === 'browse' ? (
                    <>
                        {/* Search & Filters */}
                        <div className="search-bar animate-slide-up delay-1">
                            <div className="search-input-wrapper">
                                <span className="search-icon">🔍</span>
                                <input
                                    className="input-field"
                                    placeholder="Search by title, company, or skills..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                            </div>
                            <select
                                className="input-field"
                                value={filterType}
                                onChange={(e) => setFilterType(e.target.value)}
                                style={{ minWidth: '140px' }}
                            >
                                {uniqueTypes.map((t) => (
                                    <option key={t} value={t}>
                                        {t === 'all' ? 'All Types' : t}
                                    </option>
                                ))}
                            </select>
                            <select
                                className="input-field"
                                value={filterLocation}
                                onChange={(e) => setFilterLocation(e.target.value)}
                                style={{ minWidth: '160px' }}
                            >
                                {uniqueLocations.map((l) => (
                                    <option key={l} value={l}>
                                        {l === 'all' ? 'All Locations' : l}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Job Grid */}
                        {filteredJobs.length === 0 ? (
                            <div className="glass-card empty-state animate-slide-up delay-2">
                                <div className="empty-state-icon">🔍</div>
                                <div className="empty-state-text">
                                    No jobs match your search criteria. Try adjusting your filters.
                                </div>
                            </div>
                        ) : (
                            <div className="job-grid animate-slide-up delay-2">
                                {filteredJobs.map((job) => {
                                    const applied = hasApplied(job.id, user.email);
                                    return (
                                        <div key={job.id} className="glass-card job-card">
                                            <div className="job-card-header">
                                                <div>
                                                    <div className="job-card-title">{job.title}</div>
                                                    <div className="job-card-company">{job.company}</div>
                                                </div>
                                            </div>

                                            <div className="job-card-meta">
                                                <span className="badge badge-primary">📍 {job.location}</span>
                                                <span className="badge badge-teal">⏰ {job.type}</span>
                                            </div>

                                            <div className="job-card-salary">
                                                ${(job.salaryMin / 1000).toFixed(0)}K – $
                                                {(job.salaryMax / 1000).toFixed(0)}K
                                            </div>

                                            <div className="job-card-desc">{job.description}</div>

                                            {/* Requirements */}
                                            {job.requirements && (
                                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                                                    {job.requirements.split(',').slice(0, 4).map((req, i) => (
                                                        <span
                                                            key={i}
                                                            className="badge badge-pink"
                                                            style={{ fontSize: '10px' }}
                                                        >
                                                            {req.trim()}
                                                        </span>
                                                    ))}
                                                    {job.requirements.split(',').length > 4 && (
                                                        <span className="badge badge-pink" style={{ fontSize: '10px' }}>
                                                            +{job.requirements.split(',').length - 4} more
                                                        </span>
                                                    )}
                                                </div>
                                            )}

                                            <div className="job-card-footer">
                                                <span className="job-card-date">📅 {job.postedDate}</span>
                                                <div style={{ display: 'flex', gap: '8px' }}>
                                                    <button
                                                        className="btn btn-outline btn-sm"
                                                        onClick={() =>
                                                            setShowJobDetail(showJobDetail === job.id ? null : job.id)
                                                        }
                                                    >
                                                        Details
                                                    </button>
                                                    {applied ? (
                                                        <span className="badge badge-green" style={{ padding: '8px 16px' }}>
                                                            ✅ Applied
                                                        </span>
                                                    ) : (
                                                        <button
                                                            className="btn btn-primary btn-sm"
                                                            onClick={() => handleApply(job)}
                                                        >
                                                            Apply Now
                                                        </button>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Job details expanded */}
                                            {showJobDetail === job.id && (
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
                                                        Full Description
                                                    </h4>
                                                    <p
                                                        style={{
                                                            fontSize: '13px',
                                                            color: 'var(--text-secondary)',
                                                            lineHeight: 1.7,
                                                            marginBottom: 'var(--gap-md)',
                                                        }}
                                                    >
                                                        {job.description}
                                                    </p>
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
                                                        Requirements
                                                    </h4>
                                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                                                        {job.requirements.split(',').map((req, i) => (
                                                            <span key={i} className="badge badge-pink">
                                                                {req.trim()}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </>
                ) : (
                    /* My Applications Tab */
                    <div className="animate-slide-up delay-1">
                        {myApplications.length === 0 ? (
                            <div className="glass-card empty-state">
                                <div className="empty-state-icon">📭</div>
                                <div className="empty-state-text">
                                    You haven&apos;t applied to any jobs yet. Browse listings and send your first application!
                                </div>
                                <button className="btn btn-secondary" onClick={() => setActiveTab('browse')}>
                                    Browse Jobs
                                </button>
                            </div>
                        ) : (
                            <div className="job-grid">
                                {myApplications.map((app) => (
                                    <div key={app.id} className="glass-card job-card" style={{ cursor: 'default' }}>
                                        <div className="job-card-header">
                                            <div>
                                                <div className="job-card-title">{app.jobTitle}</div>
                                                <div className="job-card-company">{app.jobCompany}</div>
                                            </div>
                                            <span
                                                className={`badge ${app.status === 'Pending'
                                                    ? 'badge-orange'
                                                    : app.status === 'Accepted'
                                                        ? 'badge-green'
                                                        : 'badge-red'
                                                    }`}
                                            >
                                                {app.status}
                                            </span>
                                        </div>

                                        {app.coverLetter && (
                                            <div
                                                style={{
                                                    padding: 'var(--gap-md)',
                                                    background: 'rgba(255,255,255,0.02)',
                                                    border: '1px solid var(--border-glass)',
                                                    borderRadius: 'var(--radius-md)',
                                                    fontSize: '13px',
                                                    color: 'var(--text-secondary)',
                                                    fontStyle: 'italic',
                                                    lineHeight: 1.7,
                                                }}
                                            >
                                                &ldquo;{app.coverLetter}&rdquo;
                                            </div>
                                        )}

                                        <div
                                            className="job-card-footer"
                                            style={{ borderTop: '1px solid var(--border-glass)', paddingTop: '12px' }}
                                        >
                                            <span className="job-card-date">Applied: {app.appliedDate}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Apply Modal */}
            <Modal
                isOpen={showApplyModal}
                onClose={() => setShowApplyModal(false)}
                title="Apply for Position"
            >
                {selectedJob && (
                    <form onSubmit={submitApplication}>
                        <div
                            style={{
                                padding: 'var(--gap-md)',
                                background: 'var(--gradient-card)',
                                borderRadius: 'var(--radius-md)',
                                marginBottom: 'var(--gap-lg)',
                            }}
                        >
                            <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '4px' }}>
                                {selectedJob.title}
                            </h3>
                            <p style={{ fontSize: '13px', color: 'var(--accent-secondary)' }}>
                                {selectedJob.company} — {selectedJob.location}
                            </p>
                            <p
                                style={{
                                    fontSize: '14px',
                                    color: 'var(--accent-orange)',
                                    fontWeight: 600,
                                    marginTop: '8px',
                                }}
                            >
                                ${(selectedJob.salaryMin / 1000).toFixed(0)}K – $
                                {(selectedJob.salaryMax / 1000).toFixed(0)}K
                            </p>
                        </div>

                        <div className="form-grid" style={{ gap: '14px' }}>
                            <div className="input-group">
                                <label>Your Name</label>
                                <input
                                    className="input-field"
                                    value={user.name}
                                    disabled
                                    style={{ opacity: 0.7 }}
                                />
                            </div>
                            <div className="input-group">
                                <label>Your Email</label>
                                <input
                                    className="input-field"
                                    value={user.email}
                                    disabled
                                    style={{ opacity: 0.7 }}
                                />
                            </div>
                            <div className="input-group">
                                <label>Cover Letter (optional)</label>
                                <textarea
                                    className="input-field"
                                    placeholder="Tell the recruiter why you're a great fit for this role..."
                                    value={coverLetter}
                                    onChange={(e) => setCoverLetter(e.target.value)}
                                    rows={5}
                                />
                            </div>
                        </div>

                        <div className="form-actions">
                            <button
                                type="button"
                                className="btn btn-outline"
                                onClick={() => setShowApplyModal(false)}
                            >
                                Cancel
                            </button>
                            <button type="submit" className="btn btn-secondary">
                                📨 Submit Application
                            </button>
                        </div>
                    </form>
                )}
            </Modal>

            <WhatsAppButton />
        </div>
    );
}
