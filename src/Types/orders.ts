export interface OrderDTO {
  id: string | number;
  petId: string | number;
  quantity: number;
  shipDate: string;
  status: 'placed' | 'approved' | 'delivered';
  complete: boolean;
}
