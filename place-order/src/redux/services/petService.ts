// petService.ts
import axios from 'axios';

const BASE_URL = 'https://petstore.swagger.io/v2';

export const fetchAvailablePets = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/pet/findByStatus?status=available`);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      // Lỗi từ phía server (có phản hồi nhưng status không OK)
      const status = error.response.status;
      const message = error.response.data?.message || 'Lỗi từ máy chủ';
      throw new Error(`❌ Server trả về lỗi ${status}: ${message}`);
    } else if (error.request) {
      // Không có phản hồi từ server (mất mạng, timeout...)
      throw new Error('❌ Không thể kết nối đến máy chủ. Vui lòng kiểm tra mạng.');
    } else {
      // Lỗi khác (ví dụ: cấu hình sai)
      throw new Error(`❌ Đã xảy ra lỗi: ${error.message}`);
    }
  }
};
