'use client';

import { useEffect, useState } from 'react';
import { seedIfNeeded } from '@/lib/store';

export default function Navbar({ role, userName }) {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        seedIfNeeded();
        const handler = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handler, { passive: true });
        return () => window.removeEventListener('scroll', handler);
    }, []);

    const handleLogout = () => {
        if (typeof window !== 'undefined') {
            localStorage.removeItem('rp_current_user');
            window.location.href = '/';
        }
    };

    return (
        <nav
            style={{
                position: 'sticky',
                top: 0,
                zIndex: 100,
                padding: '14px 32px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                background: scrolled ? 'rgba(10, 10, 26, 0.9)' : 'transparent',
                backdropFilter: scrolled ? 'blur(20px)' : 'none',
                WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
                borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : '1px solid transparent',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
        >
            <a
                href="/"
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    textDecoration: 'none',
                }}
            >

                <span
                    style={{
                        fontFamily: 'Outfit, sans-serif',
                        fontSize: '20px',
                        fontWeight: 800,
                        background: 'linear-gradient(135deg, #6c5ce7, #00cec9)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                    }}
                >
                    ASR Services
                </span>
            </a>

            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                {userName && (
                    <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
                        {role === 'recruiter' ? '🏢' : '👤'}{' '}
                        <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{userName}</span>
                    </span>
                )}
                {role && (
                    <span
                        className={`badge ${role === 'recruiter' ? 'badge-primary' : 'badge-teal'}`}
                    >
                        {role === 'recruiter' ? 'Recruiter' : 'Job Seeker'}
                    </span>
                )}
                {role && (
                    <button onClick={handleLogout} className="btn btn-outline btn-sm">
                        Logout
                    </button>
                )}
            </div>
        </nav>
    );
}
