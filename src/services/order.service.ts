import { createOrderDTO } from '../dto/order.dto';
import axios from 'axios';
import { orderPlace } from '../redux/slices/ordersSlice';

const api = axios.create({
  baseURL: 'https://petstore.swagger.io/v2',
});

export const OrderService = {
  async placeOrder(orderData: Order): Promise<Order> {
    const res = await api.post<Order>('/store/order', orderData);
    return res.data;
  },
};

export const placeMultipleOrders = async (dispatch, form, cart) => {
  for (const item of cart) {
    const orderData = createOrderDTO(form, item);
    await dispatch(orderPlace(orderData)).unwrap();
  }
};
