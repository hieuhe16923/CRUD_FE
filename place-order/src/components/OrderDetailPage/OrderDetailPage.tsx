import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './OrderDetailPage.css';

const OrderDetailPage: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { order, customer } = location.state || {};

    if (!order || !customer) {
        return (
            <div className="order-detail-container">
                <h2>❌ Không tìm thấy thông tin đơn hàng</h2>
                <button onClick={() => navigate('/')}>Quay về trang chủ</button>
            </div>
        );
    }

    return (
        <div className="order-detail-container">
            <h2>🎉 Đơn hàng đã được đặt thành công!</h2>
            <div className="order-card">
                <p><strong>Mã đơn hàng:</strong> {order.id}</p>
                <p><strong>ID thú cưng:</strong> {order.petId}</p>
                <p><strong>Số lượng:</strong> {order.quantity}</p>
                <p><strong>Ngày giao hàng:</strong> {new Date(order.shipDate).toLocaleString()}</p>
                <p><strong>Trạng thái:</strong> {order.status}</p>
                <p><strong>Hoàn tất:</strong> {order.complete ? '✅ Có' : '❌ Không'}</p>
                <hr />
                <p><strong>Người nhận:</strong> {customer.name}</p>
                <p><strong>SĐT:</strong> {customer.phone}</p>
                <p><strong>Email:</strong> {customer.email}</p>
                <p><strong>Địa chỉ:</strong> {customer.address}</p>
                <div role="alert" className="notification">
                    Sau khi đơn hàng đã được đặt thành công chúng tôi sẽ liên hệ thông báo giá bán cho khách hàng , vui lòng để ý điện thoại để nhận thông tin.
                </div>
            </div>
        </div>
    );
};

export default OrderDetailPage;
