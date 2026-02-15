// localStorage-based data store for the recruitment platform

const KEYS = {
    USERS: 'rp_users',
    JOBS: 'rp_jobs',
    APPLICATIONS: 'rp_applications',
    CURRENT_USER: 'rp_current_user',
    SEEDED: 'rp_seeded',
};

// ── Seed Data ──────────────────────────────────────────────
const SEED_JOBS = [
    {
        id: 'job_1',
        title: 'Senior React Developer',
        company: 'TechNova Inc.',
        location: 'San Francisco, CA',
        type: 'Full-time',
        salaryMin: 120000,
        salaryMax: 180000,
        description: 'We are looking for an experienced React developer to lead our frontend team. You will architect scalable web applications and mentor junior developers.',
        requirements: 'React, TypeScript, Node.js, 5+ years experience, REST APIs, GraphQL',
        postedBy: 'recruiter_seed_1',
        postedDate: '2026-02-10',
        status: 'active',
    },
    {
        id: 'job_2',
        title: 'UX/UI Designer',
        company: 'DesignCraft Studio',
        location: 'New York, NY',
        type: 'Full-time',
        salaryMin: 90000,
        salaryMax: 130000,
        description: 'Join our creative team to design beautiful, user-centric interfaces for enterprise SaaS products. You will work closely with product managers and engineers.',
        requirements: 'Figma, Adobe XD, User Research, Prototyping, Design Systems, 3+ years experience',
        postedBy: 'recruiter_seed_2',
        postedDate: '2026-02-08',
        status: 'active',
    },
    {
        id: 'job_3',
        title: 'DevOps Engineer',
        company: 'CloudScale Solutions',
        location: 'Austin, TX',
        type: 'Full-time',
        salaryMin: 110000,
        salaryMax: 160000,
        description: 'Build and maintain CI/CD pipelines, manage Kubernetes clusters, and ensure 99.99% uptime for our mission-critical services.',
        requirements: 'AWS, Docker, Kubernetes, Terraform, Jenkins, 4+ years experience',
        postedBy: 'recruiter_seed_1',
        postedDate: '2026-02-12',
        status: 'active',
    },
    {
        id: 'job_4',
        title: 'Data Scientist',
        company: 'InsightAI Labs',
        location: 'Remote',
        type: 'Remote',
        salaryMin: 130000,
        salaryMax: 200000,
        description: 'Apply machine learning and statistical analysis to solve complex business problems. Work with petabytes of data to deliver actionable insights.',
        requirements: 'Python, TensorFlow, PyTorch, SQL, Statistics, PhD preferred',
        postedBy: 'recruiter_seed_3',
        postedDate: '2026-02-05',
        status: 'active',
    },
    {
        id: 'job_5',
        title: 'Product Manager',
        company: 'LaunchPad Ventures',
        location: 'Seattle, WA',
        type: 'Full-time',
        salaryMin: 100000,
        salaryMax: 150000,
        description: 'Own the product roadmap for our flagship mobile app. Define features, prioritize backlog, and drive cross-functional execution.',
        requirements: 'Agile, User Stories, Roadmapping, Analytics, 3+ years in SaaS PM',
        postedBy: 'recruiter_seed_2',
        postedDate: '2026-02-11',
        status: 'active',
    },
    {
        id: 'job_6',
        title: 'Mobile App Developer',
        company: 'AppForge',
        location: 'Chicago, IL',
        type: 'Contract',
        salaryMin: 80000,
        salaryMax: 120000,
        description: 'Develop cross-platform mobile applications using React Native. Integrate RESTful APIs and push notifications for consumer-facing products.',
        requirements: 'React Native, iOS, Android, REST APIs, Firebase, 2+ years experience',
        postedBy: 'recruiter_seed_3',
        postedDate: '2026-02-13',
        status: 'active',
    },
    {
        id: 'job_7',
        title: 'Cybersecurity Analyst',
        company: 'SecureNet Corp',
        location: 'Washington, DC',
        type: 'Full-time',
        salaryMin: 95000,
        salaryMax: 145000,
        description: 'Monitor threat landscapes, conduct vulnerability assessments, and implement security protocols to protect enterprise infrastructure.',
        requirements: 'CISSP, SIEM tools, Penetration Testing, Network Security, 3+ years',
        postedBy: 'recruiter_seed_1',
        postedDate: '2026-02-09',
        status: 'active',
    },
    {
        id: 'job_8',
        title: 'Backend Engineer (Go)',
        company: 'StreamLine Systems',
        location: 'Denver, CO',
        type: 'Hybrid',
        salaryMin: 115000,
        salaryMax: 170000,
        description: 'Design and implement high-performance microservices in Go. Build event-driven architectures handling millions of requests per second.',
        requirements: 'Go, gRPC, PostgreSQL, Redis, Kafka, Microservices, 4+ years',
        postedBy: 'recruiter_seed_2',
        postedDate: '2026-02-14',
        status: 'active',
    },
];

// ── Helpers ────────────────────────────────────────────────
function get(key) {
    if (typeof window === 'undefined') return null;
    try {
        const raw = localStorage.getItem(key);
        return raw ? JSON.parse(raw) : null;
    } catch {
        return null;
    }
}

function set(key, value) {
    if (typeof window === 'undefined') return;
    localStorage.setItem(key, JSON.stringify(value));
}

// ── Seed ───────────────────────────────────────────────────
export function seedIfNeeded() {
    if (typeof window === 'undefined') return;
    if (get(KEYS.SEEDED)) return;
    set(KEYS.JOBS, SEED_JOBS);
    set(KEYS.APPLICATIONS, []);
    set(KEYS.USERS, []);
    set(KEYS.SEEDED, true);
}

// ── Users ──────────────────────────────────────────────────
export function getUser() {
    return get(KEYS.CURRENT_USER);
}

export function setUser(user) {
    set(KEYS.CURRENT_USER, user);
    // Also persist to users list
    const users = get(KEYS.USERS) || [];
    const existing = users.findIndex((u) => u.email === user.email);
    if (existing >= 0) {
        users[existing] = { ...users[existing], ...user };
    } else {
        users.push(user);
    }
    set(KEYS.USERS, users);
}

export function findUser(email, password) {
    const users = get(KEYS.USERS) || [];
    return users.find((u) => u.email === email && u.password === password) || null;
}

export function logout() {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(KEYS.CURRENT_USER);
}

// ── Jobs ───────────────────────────────────────────────────
export function getJobs() {
    return get(KEYS.JOBS) || [];
}

export function getJobById(id) {
    const jobs = getJobs();
    return jobs.find((j) => j.id === id) || null;
}

export function addJob(job) {
    const jobs = getJobs();
    job.id = 'job_' + Date.now();
    job.postedDate = new Date().toISOString().split('T')[0];
    job.status = 'active';
    jobs.unshift(job);
    set(KEYS.JOBS, jobs);
    return job;
}

export function updateJob(id, updates) {
    const jobs = getJobs();
    const idx = jobs.findIndex((j) => j.id === id);
    if (idx >= 0) {
        jobs[idx] = { ...jobs[idx], ...updates };
        set(KEYS.JOBS, jobs);
        return jobs[idx];
    }
    return null;
}

export function deleteJob(id) {
    const jobs = getJobs().filter((j) => j.id !== id);
    set(KEYS.JOBS, jobs);
    // Also remove related applications
    const apps = getApplications().filter((a) => a.jobId !== id);
    set(KEYS.APPLICATIONS, apps);
}

// ── Applications ───────────────────────────────────────────
export function getApplications() {
    return get(KEYS.APPLICATIONS) || [];
}

export function addApplication(app) {
    const apps = getApplications();
    app.id = 'app_' + Date.now();
    app.appliedDate = new Date().toISOString().split('T')[0];
    app.status = 'Pending';
    apps.unshift(app);
    set(KEYS.APPLICATIONS, apps);
    return app;
}

export function getApplicationsByJob(jobId) {
    return getApplications().filter((a) => a.jobId === jobId);
}

export function getApplicationsByUser(email) {
    return getApplications().filter((a) => a.applicantEmail === email);
}

export function hasApplied(jobId, email) {
    return getApplications().some((a) => a.jobId === jobId && a.applicantEmail === email);
}
