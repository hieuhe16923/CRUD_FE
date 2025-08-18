import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import OptionSelect from '../../Components/SelectOption';
import FormInput from '../../Components/FormInput';
import FormButton from '../../Components/FormButton';
import { placeMultipleOrders } from '../../services/order.service';
import { RootState, AppDispatch } from '../../redux/store';
import {
  resetOrder,
  clearCart,
  updateCartQuantity,
  removeFromCart,
} from '../../redux/slices/ordersSlice';

import 'react-toastify/dist/ReactToastify.css';

const OrderForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { order, loading, error, cart } = useSelector(
    (state: RootState) => state.order
  );

  const [hasSubmitted, setHasSubmitted] = useState(false);

  useEffect(() => {
    dispatch(resetOrder());
  }, [dispatch]);

  const [form, setForm] = useState({
    id: '',
    status: 'placed',
    complete: false,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleQuantityChange = (id: number, quantity: number) => {
    dispatch(updateCartQuantity({ id, quantity: Number(quantity) }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!cart || cart.length === 0) {
      toast.error('Giỏ hàng trống!');
      return;
    }

    setHasSubmitted(true);

    try {
      // 👉 gọi API cho từng pet trong giỏ
      await placeMultipleOrders(dispatch, form, cart);

      dispatch(clearCart());
      setTimeout(() => navigate('/'), 2000);
    } catch (err) {
      toast.error('Có lỗi xảy ra khi đặt hàng');
    }
  };

  useEffect(() => {
    if (hasSubmitted && order) {
      toast.success('Đặt hàng thành công!', { autoClose: 2000 });
      dispatch(clearCart());
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } else if (hasSubmitted && error) {
      toast.error(error);
    }
  }, [order, error, hasSubmitted, dispatch, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-4">
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Place Order</h2>
          <p className="text-gray-600">
            Fill in the details to place your pet order
          </p>
        </div>

        <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
          <div className="px-6 py-8 sm:px-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4 border-b pb-4">
                {cart.map(item => (
                  <div
                    key={item.id}
                    className="flex justify-between items-center border-b py-2"
                  >
                    <span className="text-gray-700 font-medium">
                      Pet ID: {item.id}
                    </span>
                    <div className="space-y-1">
                      <FormInput
                        label="Quantity"
                        name="quantity"
                        value={item.quantity}
                        onChange={e =>
                          handleQuantityChange(item.id, Number(e.target.value))
                        }
                        type="number"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => dispatch(removeFromCart(item.id))}
                      className="ml-4 text-red-500 hover:text-red-700 font-semibold"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>

              <FormInput
                label="Id"
                name="id"
                value={form.id}
                onChange={handleChange}
                type="number"
              />

              <OptionSelect
                label="Order Status"
                name="status"
                value={form.status}
                onChange={handleChange}
                options={[
                  { value: 'placed', label: 'Placed' },
                  { value: 'approved', label: 'Approved' },
                  { value: 'delivered', label: 'Delivered' },
                ]}
              />

              <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                <input
                  type="checkbox"
                  name="complete"
                  checked={form.complete}
                  onChange={handleChange}
                  className="w-5 h-5 text-blue-600 border-2 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                />
                <label className="text-sm font-medium text-gray-700 select-none cursor-pointer">
                  Mark as complete
                </label>
              </div>

              <div className="pt-4">
                <FormButton
                  text="Place Order"
                  loading={loading}
                  type="submit"
                  className="font-semibold py-4 px-6 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
                />
              </div>
            </form>
          </div>

          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 sm:px-8">
            <div className="flex items-center justify-center text-sm text-gray-500">
              <svg
                className="w-4 h-4 mr-1"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2-2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                  clipRule="evenodd"
                />
              </svg>
              Secure order processing
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderForm;
