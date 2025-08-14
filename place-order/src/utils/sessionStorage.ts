// src/utils/sessionStorage.ts
export const loadCartFromSession = () => {
  try {
    const serializedCart = sessionStorage.getItem('cart');
    if (serializedCart === null) return undefined;
    return JSON.parse(serializedCart);
  } catch (err) {
    console.error('Lỗi khi load cart từ sessionStorage:', err);
    return undefined;
  }
};

export const saveCartToSession = (cartState: any) => {
  try {
    const serializedCart = JSON.stringify(cartState);
    sessionStorage.setItem('cart', serializedCart);
  } catch (err) {
    console.error('Lỗi khi lưu cart vào sessionStorage:', err);
  }
};
