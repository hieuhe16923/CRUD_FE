// src/components/Footer.tsx
import React from 'react';
import './footer.css'; // Đảm bảo file CSS nằm cùng thư mục hoặc điều chỉnh đường dẫn

const Footer: React.FC = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-links">
                    <a href="#">Trang chủ</a>
                    <a href="#">Giới thiệu</a>
                    <a href="#">Liên hệ</a>
                    <a href="#">Chính sách</a>
                </div>
                <div className="social-icons">
                    <a href="#" className="facebook"><i className="bi bi-facebook"></i></a>
                    <a href="#" className="instagram"><i className="bi bi-instagram"></i></a>
                    <a href="#" className="twitter"><i className="bi bi-twitter"></i></a>
                </div>
                <div className="copyright">
                    © 2025 Công ty TNHH Pet Paradise. Mọi quyền được bảo lưu.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
