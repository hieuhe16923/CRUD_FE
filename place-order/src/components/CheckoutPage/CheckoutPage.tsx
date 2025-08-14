import React, { useState, useEffect } from 'react';
import './CheckoutPage.css';
import { placeOrder } from '../../redux/services/orderService';
import { clearCart } from '../../redux/cartSlice';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const CheckoutPage: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    email: '',
  });

  const [errors, setErrors] = useState({
    name: false,
    phone: false,
    address: false,
    email: false,
  });

  const [orderData, setOrderData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    const storedOrder = sessionStorage.getItem('orderData');
    if (storedOrder) {
      const parsedOrder = JSON.parse(storedOrder);

      if (typeof parsedOrder.id !== 'number' || parsedOrder.id < 1 || parsedOrder.id > 10) {
        parsedOrder.id = Math.floor(Math.random() * 10) + 1;
      }

      const now = new Date();
      const shipDate = new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000);
      parsedOrder.shipDate = shipDate.toISOString();

      setOrderData(parsedOrder);
    } else {
      alert('❌ Không tìm thấy dữ liệu đơn hàng. Vui lòng quay lại giỏ hàng.');
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    if (name === 'phone') {
      if (!/^\d*$/.test(value)) return;
      if (value.length > 11) return;
      const startsWithZero = value.startsWith('0');
      setErrors(prev => ({
        ...prev,
        phone: value.length > 0 && (!startsWithZero || value.length < 10),
      }));
    }

    if (name === 'email') {
      const startsWithLetter = /^[a-zA-Z]/.test(value);
      setErrors(prev => ({
        ...prev,
        email: value.length > 0 && !startsWithLetter,
      }));
    }

    setFormData(prev => ({ ...prev, [name]: value }));
    if (name !== 'phone' && name !== 'email') {
      setErrors(prev => ({ ...prev, [name]: false }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const phoneRegex = /^0\d{9,10}$/;
    const emailRegex = /^[a-zA-Z][^\s@]*@[^\s@]+\.[^\s@]+$/;

    const newErrors = {
      name: formData.name.trim() === '',
      phone: !phoneRegex.test(formData.phone.trim()),
      address: formData.address.trim() === '',
      email: !emailRegex.test(formData.email.trim()),
    };

    setErrors(newErrors);

    const hasError = Object.values(newErrors).some(error => error);
    if (hasError || !orderData) return;

    setIsLoading(true);

    try {
      setTimeout(async () => {
        const response = await placeOrder(orderData);

        toast.success(`🎉 Bạn đã đặt hàng thành công!`, {
          position: 'top-right',
          autoClose: 2000,
        });

        sessionStorage.setItem('lastOrderId', response.id.toString());
        sessionStorage.removeItem('orderData');

        dispatch(clearCart());

        setTimeout(() => {
          navigate('/orderdetail', { state: { order: response, customer: formData } });
        }, 2000);
      }, 5000);
    } catch (error) {
      console.error('Lỗi gửi đơn hàng:', error);
      toast.error('❌ Gửi đơn hàng thất bại. Vui lòng thử lại sau.');
      setIsLoading(false);
    }
  };

  return (
    <div className="checkout-container">
      <h2>📦 Nhập thông tin nhận hàng</h2>
      <form onSubmit={handleSubmit} className="checkout-form">
        <label>
          Họ và tên:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={errors.name ? 'error' : ''}
          />
        </label>
        {errors.name && <p className="error-text">Vui lòng nhập họ tên</p>}

        <label>
          Số điện thoại:
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className={errors.phone ? 'error' : ''}
          />
        </label>
        {errors.phone && (
          <p className="error-text">
            Số điện thoại phải bắt đầu bằng số 0 và có từ 10 đến 11 chữ số
          </p>
        )}

        <label>
          Địa chỉ nhận hàng:
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            className={errors.address ? 'error' : ''}
            rows={3}
            placeholder="Số nhà, đường, phường/xã, quận/huyện, tỉnh/thành phố"
          />
        </label>
        {errors.address && <p className="error-text">Vui lòng nhập địa chỉ</p>}

        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={errors.email ? 'error' : ''}
          />
        </label>
        {errors.email && (
          <p className="error-text">
            Email phải bắt đầu bằng chữ cái và đúng định dạng (ví dụ: ten@gmail.com)
          </p>
        )}

        <button type="submit" className="submit-btn">Gửi thông tin</button>
      </form>

      {isLoading && (
        <div className="loading-overlay">
          <div className="spinner"></div>
          <p>⏳ Vui lòng chờ xử lý đơn hàng...</p>
        </div>
      )}
    </div>
  );
};

export default CheckoutPage;
