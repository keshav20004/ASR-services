'use client';

import { useState } from 'react';

export default function JobSeekerLogin() {
    const [isSignup, setIsSignup] = useState(false);
    const [form, setForm] = useState({ email: '', password: '', name: '', skills: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            if (isSignup) {
                if (!form.email || !form.password || !form.name) {
                    setError('Please fill all required fields');
                    setLoading(false);
                    return;
                }
                const res = await fetch('/api/auth/signup', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ ...form, role: 'jobseeker' }),
                });
                const data = await res.json();
                if (!res.ok) {
                    setError(data.error || 'Signup failed');
                    setLoading(false);
                    return;
                }
                localStorage.setItem('asr_user', JSON.stringify(data));
                window.location.href = '/jobseeker';
            } else {
                if (!form.email || !form.password) {
                    setError('Please fill all fields');
                    setLoading(false);
                    return;
                }
                const res = await fetch('/api/auth/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email: form.email, password: form.password }),
                });
                const data = await res.json();
                if (!res.ok) {
                    setError(data.error || 'Invalid credentials. Try signing up!');
                    setLoading(false);
                    return;
                }
                if (data.role !== 'jobseeker') {
                    setError('This account is not a job seeker account.');
                    setLoading(false);
                    return;
                }
                localStorage.setItem('asr_user', JSON.stringify(data));
                window.location.href = '/jobseeker';
            }
        } catch (err) {
            setError('Something went wrong. Please try again.');
            setLoading(false);
        }
    };

    return (
        <div
            style={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                padding: '24px',
            }}
        >
            {/* Background orbs */}
            <div
                style={{
                    position: 'fixed',
                    top: '-10%',
                    right: '-5%',
                    width: '500px',
                    height: '500px',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(0,206,201,0.12) 0%, transparent 70%)',
                    filter: 'blur(60px)',
                }}
            />
            <div
                style={{
                    position: 'fixed',
                    bottom: '-10%',
                    left: '-5%',
                    width: '400px',
                    height: '400px',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(108,92,231,0.1) 0%, transparent 70%)',
                    filter: 'blur(60px)',
                }}
            />

            <div
                className="animate-slide-up"
                style={{
                    width: '100%',
                    maxWidth: '440px',
                    position: 'relative',
                    zIndex: 1,
                }}
            >
                {/* Back link */}
                <a
                    href="/"
                    style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        color: 'var(--text-secondary)',
                        fontSize: '14px',
                        marginBottom: '24px',
                    }}
                >
                    ← Back to Home
                </a>

                <div
                    className="glass-card"
                    style={{
                        padding: '40px',
                        position: 'relative',
                        overflow: 'hidden',
                    }}
                >
                    {/* Accent glow */}
                    <div
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            height: '4px',
                            background: 'var(--gradient-secondary)',
                            borderRadius: 'var(--radius-lg) var(--radius-lg) 0 0',
                        }}
                    />

                    <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                        <div
                            style={{
                                width: '56px',
                                height: '56px',
                                borderRadius: '14px',
                                background: 'var(--gradient-secondary)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                margin: '0 auto 16px',
                                fontSize: '24px',
                            }}
                        >
                            💼
                        </div>
                        <h1 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '6px' }}>
                            {isSignup ? 'Create Job Seeker Account' : 'Job Seeker Login'}
                        </h1>
                        <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
                            {isSignup
                                ? 'Find your dream job today'
                                : 'Welcome back! Sign in to continue'}
                        </p>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="form-grid" style={{ gap: '16px' }}>
                            {isSignup && (
                                <>
                                    <div className="input-group">
                                        <label>Full Name</label>
                                        <input
                                            className="input-field"
                                            type="text"
                                            name="name"
                                            placeholder="Jane Doe"
                                            value={form.name}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="input-group">
                                        <label>Skills (comma separated)</label>
                                        <input
                                            className="input-field"
                                            type="text"
                                            name="skills"
                                            placeholder="React, Python, Design..."
                                            value={form.skills}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </>
                            )}
                            <div className="input-group">
                                <label>Email</label>
                                <input
                                    className="input-field"
                                    type="email"
                                    name="email"
                                    placeholder="you@example.com"
                                    value={form.email}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="input-group">
                                <label>Password</label>
                                <input
                                    className="input-field"
                                    type="password"
                                    name="password"
                                    placeholder="••••••••"
                                    value={form.password}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        {error && (
                            <div
                                style={{
                                    marginTop: '16px',
                                    padding: '10px 14px',
                                    borderRadius: '8px',
                                    background: 'rgba(225, 112, 85, 0.1)',
                                    border: '1px solid rgba(225, 112, 85, 0.3)',
                                    color: '#e17055',
                                    fontSize: '13px',
                                }}
                            >
                                {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            className="btn btn-secondary btn-lg"
                            disabled={loading}
                            style={{ width: '100%', marginTop: '24px' }}
                        >
                            {loading ? (
                                <span
                                    style={{
                                        width: '18px',
                                        height: '18px',
                                        border: '2px solid rgba(0,0,0,0.3)',
                                        borderTopColor: '#0a0a1a',
                                        borderRadius: '50%',
                                        display: 'inline-block',
                                        animation: 'spin 0.8s linear infinite',
                                    }}
                                />
                            ) : isSignup ? (
                                'Create Account'
                            ) : (
                                'Sign In'
                            )}
                        </button>
                    </form>

                    <div
                        style={{
                            textAlign: 'center',
                            marginTop: '24px',
                            fontSize: '14px',
                            color: 'var(--text-secondary)',
                        }}
                    >
                        {isSignup ? 'Already have an account?' : "Don't have an account?"}{' '}
                        <button
                            onClick={() => {
                                setIsSignup(!isSignup);
                                setError('');
                            }}
                            style={{
                                background: 'none',
                                color: '#81ecec',
                                fontWeight: 600,
                                fontSize: '14px',
                            }}
                        >
                            {isSignup ? 'Sign In' : 'Sign Up'}
                        </button>
                    </div>
                </div>
            </div>

            <style jsx>{`
        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
        </div>
    );
}
