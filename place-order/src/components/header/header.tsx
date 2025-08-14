import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import CartDropdown from '../CartDropdown/CartDropdown';
import './header.css';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const items = useSelector((state: RootState) => state.cart.items);
  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="header">
      <div className="logo" onClick={() => window.location.href = '/'}>
        🐶 <span>Pet Shop</span>
      </div>

      <div className="cart-icon-wrapper">
        <button className="cart-icon-btn" onClick={() => setIsOpen(!isOpen)}>
          <span className="cart-icon">🛍️</span>
          {totalQuantity > 0 && <span className="cart-count">{totalQuantity}</span>}
        </button>

        {isOpen && (
          <div className="cart-dropdown-wrapper">
            <CartDropdown onClose={() => setIsOpen(false)} />
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
