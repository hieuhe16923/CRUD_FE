import axios from 'axios';

export const placeOrder = async (orderData: {
  id: number;
  petId: number;
  quantity: number;
  shipDate: string;
  status: 'placed';
  complete: boolean;
}) => {
  const response = await axios.post('https://petstore.swagger.io/v2/store/order', orderData);
  return response.data;
};
