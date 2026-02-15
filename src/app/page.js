'use client';

import { useEffect, useRef } from 'react';
import WhatsAppButton from '@/components/WhatsAppButton';

export default function Home() {
    const canvasRef = useRef(null);

    useEffect(() => {

        // Particle animation
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let animId;
        let particles = [];

        function resize() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        resize();
        window.addEventListener('resize', resize);

        class Particle {
            constructor() {
                this.reset();
            }
            reset() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 2 + 0.5;
                this.speedX = (Math.random() - 0.5) * 0.5;
                this.speedY = (Math.random() - 0.5) * 0.5;
                this.opacity = Math.random() * 0.5 + 0.1;
            }
            update() {
                this.x += this.speedX;
                this.y += this.speedY;
                if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
                    this.reset();
                }
            }
            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(108, 92, 231, ${this.opacity})`;
                ctx.fill();
            }
        }

        for (let i = 0; i < 80; i++) {
            particles.push(new Particle());
        }

        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach((p) => {
                p.update();
                p.draw();
            });

            // Draw lines between close particles
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 120) {
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.strokeStyle = `rgba(108, 92, 231, ${0.1 * (1 - dist / 120)})`;
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                    }
                }
            }
            animId = requestAnimationFrame(animate);
        }
        animate();

        return () => {
            cancelAnimationFrame(animId);
            window.removeEventListener('resize', resize);
        };
    }, []);

    return (
        <div style={{ minHeight: '100vh', position: 'relative', overflow: 'hidden' }}>
            {/* Particle canvas */}
            <canvas
                ref={canvasRef}
                style={{
                    position: 'fixed',
                    inset: 0,
                    zIndex: 0,
                    pointerEvents: 'none',
                }}
            />

            {/* Gradient orbs */}
            <div
                style={{
                    position: 'fixed',
                    top: '-20%',
                    right: '-10%',
                    width: '600px',
                    height: '600px',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(108,92,231,0.15) 0%, transparent 70%)',
                    filter: 'blur(80px)',
                    zIndex: 0,
                }}
            />
            <div
                style={{
                    position: 'fixed',
                    bottom: '-20%',
                    left: '-10%',
                    width: '500px',
                    height: '500px',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(0,206,201,0.12) 0%, transparent 70%)',
                    filter: 'blur(80px)',
                    zIndex: 0,
                }}
            />

            {/* Content */}
            <div style={{ position: 'relative', zIndex: 1 }}>
                {/* Header */}
                <header
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '20px 40px',
                    }}
                >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span
                            style={{
                                fontFamily: 'Outfit, sans-serif',
                                fontSize: '24px',
                                fontWeight: 800,
                                background: 'linear-gradient(135deg, #6c5ce7, #00cec9)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundClip: 'text',
                            }}
                        >
                            ASR Services
                        </span>
                    </div>
                </header>

                {/* Hero */}
                <section
                    className="animate-fade-in"
                    style={{
                        textAlign: 'center',
                        padding: '80px 24px 60px',
                        maxWidth: '800px',
                        margin: '0 auto',
                    }}
                >
                    <div
                        className="badge badge-primary animate-slide-up"
                        style={{ marginBottom: '24px', fontSize: '13px', padding: '6px 18px' }}
                    >
                        ✨ The Future of Recruitment
                    </div>
                    <h1
                        className="animate-slide-up delay-1"
                        style={{
                            fontSize: 'clamp(36px, 6vw, 64px)',
                            fontWeight: 800,
                            lineHeight: 1.1,
                            marginBottom: '24px',
                        }}
                    >
                        Where{' '}
                        <span
                            style={{
                                background: 'linear-gradient(135deg, #6c5ce7, #a29bfe, #00cec9)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundClip: 'text',
                            }}
                        >
                            Talent
                        </span>{' '}
                        Meets{' '}
                        <span
                            style={{
                                background: 'linear-gradient(135deg, #00cec9, #81ecec, #6c5ce7)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundClip: 'text',
                            }}
                        >
                            Opportunity
                        </span>
                    </h1>
                    <p
                        className="animate-slide-up delay-2"
                        style={{
                            fontSize: '18px',
                            color: 'var(--text-secondary)',
                            lineHeight: 1.7,
                            maxWidth: '600px',
                            margin: '0 auto 48px',
                        }}
                    >
                        ASR Services connects exceptional talent with leading companies. Whether you&apos;re hiring or looking for your dream job, start your journey here.
                    </p>
                </section>

                {/* Role Selection Cards */}
                <section
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                        gap: '32px',
                        maxWidth: '800px',
                        margin: '0 auto',
                        padding: '0 24px 80px',
                    }}
                >
                    {/* Recruiter Card */}
                    <a
                        href="/login/recruiter"
                        className="animate-slide-up delay-2"
                        style={{
                            display: 'block',
                            textDecoration: 'none',
                            position: 'relative',
                            overflow: 'hidden',
                        }}
                    >
                        <div
                            className="glass-card"
                            style={{
                                padding: '40px 32px',
                                textAlign: 'center',
                                cursor: 'pointer',
                                position: 'relative',
                                overflow: 'hidden',
                            }}
                        >
                            <div
                                style={{
                                    position: 'absolute',
                                    top: '-30px',
                                    right: '-30px',
                                    width: '120px',
                                    height: '120px',
                                    borderRadius: '50%',
                                    background: 'radial-gradient(circle, rgba(108,92,231,0.2) 0%, transparent 70%)',
                                    filter: 'blur(20px)',
                                }}
                            />
                            <div
                                style={{
                                    width: '64px',
                                    height: '64px',
                                    borderRadius: '16px',
                                    background: 'var(--gradient-primary)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    margin: '0 auto 20px',
                                    fontSize: '28px',
                                }}
                            >
                                🏢
                            </div>
                            <h2
                                style={{
                                    fontSize: '22px',
                                    fontWeight: 700,
                                    marginBottom: '12px',
                                    color: 'var(--text-primary)',
                                }}
                            >
                                I Want to Hire
                            </h2>
                            <p
                                style={{
                                    fontSize: '14px',
                                    color: 'var(--text-secondary)',
                                    lineHeight: 1.7,
                                    marginBottom: '24px',
                                }}
                            >
                                Post jobs, discover top candidates, and manage your hiring pipeline — all in one place.
                            </p>
                            <div className="btn btn-primary" style={{ width: '100%' }}>
                                Get Started →
                            </div>
                        </div>
                    </a>

                    {/* Job Seeker Card */}
                    <a
                        href="/login/jobseeker"
                        className="animate-slide-up delay-3"
                        style={{
                            display: 'block',
                            textDecoration: 'none',
                            position: 'relative',
                            overflow: 'hidden',
                        }}
                    >
                        <div
                            className="glass-card"
                            style={{
                                padding: '40px 32px',
                                textAlign: 'center',
                                cursor: 'pointer',
                                position: 'relative',
                                overflow: 'hidden',
                            }}
                        >
                            <div
                                style={{
                                    position: 'absolute',
                                    top: '-30px',
                                    right: '-30px',
                                    width: '120px',
                                    height: '120px',
                                    borderRadius: '50%',
                                    background: 'radial-gradient(circle, rgba(0,206,201,0.2) 0%, transparent 70%)',
                                    filter: 'blur(20px)',
                                }}
                            />
                            <div
                                style={{
                                    width: '64px',
                                    height: '64px',
                                    borderRadius: '16px',
                                    background: 'var(--gradient-secondary)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    margin: '0 auto 20px',
                                    fontSize: '28px',
                                }}
                            >
                                💼
                            </div>
                            <h2
                                style={{
                                    fontSize: '22px',
                                    fontWeight: 700,
                                    marginBottom: '12px',
                                    color: 'var(--text-primary)',
                                }}
                            >
                                I Want a Job
                            </h2>
                            <p
                                style={{
                                    fontSize: '14px',
                                    color: 'var(--text-secondary)',
                                    lineHeight: 1.7,
                                    marginBottom: '24px',
                                }}
                            >
                                Browse thousands of opportunities, apply instantly, and track your applications — hassle-free.
                            </p>
                            <div className="btn btn-secondary" style={{ width: '100%' }}>
                                Find Jobs →
                            </div>
                        </div>
                    </a>
                </section>

                {/* Stats Section */}
                <section
                    className="animate-slide-up delay-4"
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        gap: '60px',
                        padding: '40px 24px 60px',
                        flexWrap: 'wrap',
                    }}
                >
                    {[
                        { value: '10K+', label: 'Active Jobs' },
                        { value: '50K+', label: 'Candidates' },
                        { value: '5K+', label: 'Companies' },
                        { value: '95%', label: 'Success Rate' },
                    ].map((stat, i) => (
                        <div key={i} style={{ textAlign: 'center' }}>
                            <div
                                style={{
                                    fontFamily: 'Outfit, sans-serif',
                                    fontSize: '32px',
                                    fontWeight: 800,
                                    background: 'linear-gradient(135deg, #6c5ce7, #00cec9)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    backgroundClip: 'text',
                                }}
                            >
                                {stat.value}
                            </div>
                            <div
                                style={{
                                    fontSize: '13px',
                                    color: 'var(--text-muted)',
                                    textTransform: 'uppercase',
                                    letterSpacing: '1px',
                                    marginTop: '4px',
                                }}
                            >
                                {stat.label}
                            </div>
                        </div>
                    ))}
                </section>

                {/* Features */}
                <section
                    style={{
                        maxWidth: '1000px',
                        margin: '0 auto',
                        padding: '40px 24px 100px',
                    }}
                >
                    <h2
                        style={{
                            textAlign: 'center',
                            fontSize: '28px',
                            fontWeight: 700,
                            marginBottom: '48px',
                        }}
                    >
                        Why{' '}
                        <span
                            style={{
                                background: 'linear-gradient(135deg, #6c5ce7, #00cec9)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundClip: 'text',
                            }}
                        >
                            ASR Services
                        </span>
                        ?
                    </h2>
                    <div
                        style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                            gap: '24px',
                        }}
                    >
                        {[
                            {
                                icon: '⚡',
                                title: 'Lightning Fast',
                                desc: 'Post a job listing in under 60 seconds. Apply to positions with a single click.',
                            },
                            {
                                icon: '🎯',
                                title: 'Smart Matching',
                                desc: 'Our algorithms surface the best candidates and opportunities for your profile.',
                            },
                            {
                                icon: '🔒',
                                title: 'Secure & Private',
                                desc: 'Your data stays safe and private. We never share your information without consent.',
                            },
                        ].map((feature, i) => (
                            <div
                                key={i}
                                className="glass-card"
                                style={{ padding: '32px', textAlign: 'center' }}
                            >
                                <div style={{ fontSize: '36px', marginBottom: '16px' }}>{feature.icon}</div>
                                <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '8px' }}>
                                    {feature.title}
                                </h3>
                                <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                                    {feature.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Footer */}
                <footer
                    style={{
                        textAlign: 'center',
                        padding: '24px',
                        borderTop: '1px solid var(--border-glass)',
                        fontSize: '13px',
                        color: 'var(--text-muted)',
                    }}
                >
                    © 2026 ASR Services. Built with ❤️ for the future of hiring.
                </footer>
            </div>

            <WhatsAppButton />
        </div>
    );
}
