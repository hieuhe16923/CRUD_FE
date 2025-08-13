import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer className="bg-white border-top mt-5" style={{ flexShrink: 0 }}>
            <div className="container" style={{ maxWidth: '1200px' }}>
                <div className="py-4">
                    <div className="d-flex justify-content-between align-items-center flex-wrap">
                        <div className="d-flex gap-4">
                            <a href="#" className="text-muted text-decoration-none small">
                                Tài nguyên
                            </a>
                            <a href="#" className="text-muted text-decoration-none small">
                                Công ty
                            </a>
                        </div>
                        <div className="d-flex gap-3 align-items-center">
                            <a href="#" className="text-muted text-decoration-none fs-5">
                                📘
                            </a>
                            <a href="#" className="text-muted text-decoration-none fs-5">
                                🐦
                            </a>
                            <a href="#" className="text-muted text-decoration-none fs-5">
                                💼
                            </a>
                        </div>
                    </div>
                    <div className="mt-3 d-flex align-items-center gap-2">
                        <small className="text-muted">Made with 💙 Visily</small>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;