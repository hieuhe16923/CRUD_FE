import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import './CartDropdown.css';

interface CartDropdownProps {
  onClose: () => void;
}

const CartDropdown: React.FC<CartDropdownProps> = ({ onClose }) => {
  const items = useSelector((state: RootState) => state.cart.items);
  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="cart-dropdown">
      <div className="cart-header">
        <span>Giỏ hàng</span>
        <button className="close-btn" onClick={onClose}>❌</button>
      </div>

      <div className="cart-body">
        {items.length === 0 ? (
          <p className="empty-text">Chưa có sản phẩm nào.</p>
        ) : (
          <>
            <table className="cart-table">
              <thead>
                <tr>
                  <th>Tên sản phẩm</th>
                  <th>Số lượng</th>
                </tr>
              </thead>
              <tbody>
                {items.map(item => (
                  <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>{item.quantity}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="cart-summary">
              Tổng số sản phẩm: <strong>{totalQuantity}</strong>
            </div>

            <div className="cart-footer">
              <button
                className="view-cart-btn"
                onClick={() => {
                  const overlay = document.createElement('div');
                  overlay.className = 'cart-loading-overlay';
                  overlay.innerHTML = `
      <div class="cart-spinner"></div>
      <p>⏳ Đang mở giỏ hàng...</p>
    `;
                  document.body.appendChild(overlay);

                  setTimeout(() => {
                    window.location.href = '/cart';
                  }, 400); 
                }}
              >
                Xem Giỏ Hàng
              </button>

            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CartDropdown;
