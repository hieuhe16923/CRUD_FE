import { OrderDTO } from '../Types/orders';

const now = new Date();
const shipDate = new Date(now.getTime() - now.getTimezoneOffset() * 60000)
  .toISOString()
  .slice(0, 19);

export const createOrderDTO = (form, cartItem): OrderDTO => ({
  id: form.id,
  petId: cartItem.id,
  quantity: cartItem.quantity || 1,
  shipDate: shipDate,
  status: form.status,
  complete: form.complete,
});
