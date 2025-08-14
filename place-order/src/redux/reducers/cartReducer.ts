// cartReducer.ts
interface CartItem {
  id: number;
  name: string;
  status: string;
  image?: string;
  quantity: number;
}

const initialState = {
  items: [] as CartItem[],
};

const cartReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      const existing = state.items.find(item => item.id === action.payload.id);
      if (existing) {
        return {
          ...state,
          items: state.items.map(item =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      } else {
        return {
          ...state,
          items: [...state.items, { ...action.payload, quantity: 1 }],
        };
      }

    case 'REMOVE_FROM_CART':
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload),
      };

    default:
      return state;
  }
};

export const addToCart = (pet: any) => ({
  type: 'ADD_TO_CART',
  payload: pet,
});

export const removeFromCart = (id: number) => ({
  type: 'REMOVE_FROM_CART',
  payload: id,
});

export default cartReducer;
