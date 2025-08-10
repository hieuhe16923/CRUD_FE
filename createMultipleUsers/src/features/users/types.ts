// src/features/users/types.ts
export interface User {
  id?: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
  userStatus: number;
}

export interface UsersState {
  tempUsers: User[]; // danh sách user tạm (chưa gửi)
  tempUsers2: User[]; // state mới bạn muốn tách ra
  loading: boolean; // khi gọi API batch
  error: string | null;
  success: boolean; // tạo thành công
}
