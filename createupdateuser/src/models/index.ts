// Main models
export type { Pet, PetStatus } from './Pet';
export type { User } from './User';
export type { Order, OrderStatus } from './Order';
export type { Category } from './Category';
export type { Tag } from './Tag';
export type { ApiResponse } from './ApiResponse';

// API types for common responses
export interface PetInventory {
  [status: string]: number;
}

export interface LoginResponse {
  token: string;
  expiresAfter?: string;
  rateLimit?: number;
}

// Form types for API operations
export interface PetFormData {
  name?: string;
  status?: string;
}

export interface UserLoginRequest {
  username: string;
  password: string;
}
