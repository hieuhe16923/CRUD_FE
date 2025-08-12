// Service layer exports
export { httpClient, ApiError } from './httpClient';
export { userService, UserService, handleUserServiceError } from './userService';

// Re-export types for convenience
export type { User, UserLoginRequest, ApiResponse } from '../models';
