import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store';
import {
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  setQuantity,
} from '../../redux/cartSlice';
import { toast } from 'react-toastify';
import './PetCartPage.css';
import { useNavigate } from 'react-router-dom';
import Pagination from '../../components/Pagination/Pagination';

const PetCartPage: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const [isLoading, setIsLoading] = useState(false);
  const [inputValues, setInputValues] = useState<Record<number, string>>({});
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    window.scrollTo(0, 0);
    const initialInputs: Record<number, string> = {};
    cartItems.forEach(item => {
      initialInputs[item.id] = item.quantity.toString();
    });
    setInputValues(initialInputs);
  }, [cartItems]);

  const handleRemove = (id: number, name: string) => {
    const confirm = window.confirm(`Bạn có chắc muốn xóa "${name}" khỏi giỏ hàng?`);
    if (confirm) {
      setIsLoading(true);
      setTimeout(() => {
        dispatch(removeFromCart(id));
        setIsLoading(false);
        toast.success(`Đã xóa "${name}" khỏi giỏ hàng`, {
          position: 'top-right',
          autoClose: 1000,
        });

        const totalPages = Math.ceil((cartItems.length - 1) / itemsPerPage);
        if (currentPage > totalPages) {
          setCurrentPage(Math.max(1, totalPages));
        }
      }, 1000);
    }
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      toast.warning('🛒 Giỏ hàng đang trống!');
      return;
    }

    const orderData = {
      id: Date.now(),
      petId: cartItems[0]?.id || 0,
      quantity: totalQuantity,
      shipDate: new Date().toISOString(),
      status: 'placed' as const,
      complete: true,
    };

    sessionStorage.setItem('orderData', JSON.stringify(orderData));
    setIsLoading(true);

    setTimeout(() => {
      navigate('/checkout');
    }, 1500);
  };

  const handlePageChange = (page: number) => {
    setIsLoading(true);
    setTimeout(() => {
      setCurrentPage(page);
      setIsLoading(false);
    }, 300);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedItems = cartItems.slice(startIndex, endIndex);

  return (
    <div className="pet-cart-container">
      <h2>🐾 Giỏ thú cưng của bạn</h2>

      {cartItems.length === 0 ? (
        <div className="empty-cart">
          <p>Giỏ của bạn đang trống. Hãy chọn vài bé thú cưng nhé!</p>
        </div>
      ) : (
        <div className="cart-list-wrapper">
          <ul className="pet-cart-list">
            {paginatedItems.map(pet => (
              <li key={pet.id} className="pet-cart-item">
                <div className="pet-info">
                  <strong>{pet.name}</strong>
                  <p>ID: {pet.id}</p>
                  <p>Trạng thái: {pet.status}</p>
                  {pet.image && (
                    <img src={pet.image} alt={pet.name} className="pet-image" />
                  )}
                </div>

                <div className="quantity-control">
                  <button
                    onClick={() => dispatch(decreaseQuantity(pet.id))}
                    disabled={pet.quantity <= 1}
                    className={pet.quantity <= 1 ? 'disabled-btn' : ''}
                  >
                    −
                  </button>

                  <div className="input-wrapper">
                    <input
                      type="number"
                      min={1}
                      value={inputValues[pet.id] ?? pet.quantity.toString()}
                      onChange={(e) => {
                        const raw = e.target.value;
                        setInputValues(prev => ({ ...prev, [pet.id]: raw }));
                      }}
                      onBlur={() => {
                        const raw = inputValues[pet.id];
                        const parsed = Number(raw);
                        const final = raw === '' || parsed < 1 ? 1 : parsed;
                        dispatch(setQuantity({ id: pet.id, quantity: final }));
                        setInputValues(prev => ({ ...prev, [pet.id]: final.toString() }));
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.currentTarget.blur();
                        }
                      }}
                      className="qty-input"
                    />
                  </div>

                  <button onClick={() => dispatch(increaseQuantity(pet.id))}>+</button>
                </div>

                <button
                  className="remove-btn"
                  onClick={() => handleRemove(pet.id, pet.name)}
                >
                  Xóa
                </button>
              </li>
            ))}
          </ul>

          <Pagination
            totalItems={cartItems.length}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />

          <div className="cart-summary">
            Tổng số sản phẩm: <strong>{totalQuantity}</strong>
          </div>

          <div className="checkout-section">
            <button className="checkout-btn" onClick={handleCheckout}>
              💳 Thanh toán ngay
            </button>
          </div>
        </div>
      )}

      {isLoading && (
        <div className="loading-overlay">
          <div className="spinner"></div>
          <p>⏳ Đang xử lý ...</p>
        </div>
      )}
    </div>
  );
};

export default PetCartPage;
