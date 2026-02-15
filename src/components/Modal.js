'use client';

import { useEffect, useRef } from 'react';

export default function Modal({ isOpen, onClose, title, children }) {
    const overlayRef = useRef(null);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    if (!isOpen) return null;

    const handleOverlayClick = (e) => {
        if (e.target === overlayRef.current) {
            onClose();
        }
    };

    return (
        <div className="modal-overlay" ref={overlayRef} onClick={handleOverlayClick}>
            <div className="modal-content">
                <div className="modal-header">
                    <h2 className="modal-title">{title}</h2>
                    <button className="modal-close" onClick={onClose}>
                        ✕
                    </button>
                </div>
                {children}
            </div>
        </div>
    );
}
