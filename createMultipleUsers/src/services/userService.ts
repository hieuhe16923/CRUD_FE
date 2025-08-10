import axios from "axios";
import type { User } from "../features/users/types";

const API_BASE = "https://petstore.swagger.io/v2/user";

export async function createUsersApi(users: User[]): Promise<User[]> {
  const { data } = await axios.post<User[]>(
    `${API_BASE}/createWithList`,
    users,
    { headers: { "Content-Type": "application/json" } }
  );
  return data;
}
