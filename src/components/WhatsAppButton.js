'use client';

import { useState } from 'react';

export default function WhatsAppButton() {
    const [hovered, setHovered] = useState(false);
    const phoneNumber = '917985635731';
    const message = encodeURIComponent('Hi! I visited ASR Services and would like to know more.');
    const url = `https://wa.me/${phoneNumber}?text=${message}`;

    return (
        <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
                position: 'fixed',
                bottom: '28px',
                right: '28px',
                zIndex: 9999,
                width: hovered ? 'auto' : '60px',
                height: '60px',
                borderRadius: hovered ? '30px' : '50%',
                background: '#25D366',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: hovered ? '10px' : '0',
                padding: hovered ? '0 24px 0 18px' : '0',
                boxShadow: '0 4px 24px rgba(37, 211, 102, 0.4), 0 2px 8px rgba(0,0,0,0.2)',
                cursor: 'pointer',
                textDecoration: 'none',
                transition: 'all 0.3s cubic-bezier(0.4,0,0.2,1)',
                transform: hovered ? 'scale(1.05)' : 'scale(1)',
                animation: 'whatsappPulse 2s infinite',
            }}
            aria-label="Chat on WhatsApp"
        >
            {/* WhatsApp SVG Icon */}
            <svg
                viewBox="0 0 32 32"
                fill="white"
                style={{
                    width: '32px',
                    height: '32px',
                    flexShrink: 0,
                }}
            >
                <path d="M16.004 3.2C9.17 3.2 3.6 8.77 3.6 15.604c0 2.18.57 4.31 1.66 6.19L3.2 28.8l7.22-2.03a12.36 12.36 0 005.58 1.34h.004c6.834 0 12.396-5.562 12.396-12.396 0-3.31-1.29-6.42-3.63-8.76A12.32 12.32 0 0016.004 3.2zm0 22.66a10.24 10.24 0 01-5.22-1.43l-.374-.222-3.882 1.018 1.036-3.786-.244-.388A10.23 10.23 0 015.73 15.604C5.73 9.94 10.34 5.33 16.004 5.33c2.74 0 5.316 1.068 7.254 3.006a10.19 10.19 0 013.012 7.268c0 5.664-4.602 10.256-10.266 10.256zm5.628-7.686c-.308-.154-1.824-.9-2.108-.1-2.108-.1-.282-.154-.614.048-.758.048-.152.176-.384.308-.462.128-.078 1.536-2.022 1.76-2.334.044-.062.08-.154.014-.252s-.284-.308-.396-.466c-.112-.158-.236-.136-.326-.14l-.28-.004a.538.538 0 00-.39.182 1.64 1.64 0 00-.512 1.222c0 .722.526 1.42.6 1.518s1.036 1.582 2.51 2.218c.35.15.624.242.838.31.352.112.672.096.926.058.282-.042.87-.356 .992-.7s.122-.636.086-.698c-.038-.062-.14-.1-.284-.154z" />
            </svg>

            {hovered && (
                <span
                    style={{
                        color: 'white',
                        fontWeight: 700,
                        fontSize: '14px',
                        fontFamily: 'Inter, sans-serif',
                        whiteSpace: 'nowrap',
                        letterSpacing: '0.3px',
                    }}
                >
                    Chat with us
                </span>
            )}

            <style jsx>{`
                @keyframes whatsappPulse {
                    0% { box-shadow: 0 4px 24px rgba(37, 211, 102, 0.4), 0 2px 8px rgba(0,0,0,0.2); }
                    50% { box-shadow: 0 4px 32px rgba(37, 211, 102, 0.6), 0 2px 12px rgba(0,0,0,0.3); }
                    100% { box-shadow: 0 4px 24px rgba(37, 211, 102, 0.4), 0 2px 8px rgba(0,0,0,0.2); }
                }
            `}</style>
        </a>
    );
}
