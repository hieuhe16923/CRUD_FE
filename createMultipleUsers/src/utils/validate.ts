import type { User } from "../features/users/types";

export function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function validatePhone(phone: string): boolean {
  // permissive: allow digits, spaces, +, -, parentheses
  return /^[0-9+\-\s()]{7,20}$/.test(phone);
}

/**
 * Validate user info, thêm tham số existingEmails để kiểm tra email trùng
 * @param user Partial<User> user cần kiểm tra
 * @param existingEmails danh sách email đã có để kiểm tra trùng
 * @returns mảng lỗi nếu có
 */
export function validateUser(
  user: Partial<User>,
  existingEmails: string[] = []
): string[] {
  const errs: string[] = [];

  const nameRegex = /^[a-zA-ZÀ-ỹà-ỹ\s]+$/u;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,}$/;

  if (!user.username || !user.username.toString().trim())
    errs.push("Username is required");

  if (!user.firstName || !nameRegex.test(user.firstName))
    errs.push("First name only allows letters and spaces");

  if (!user.lastName || !nameRegex.test(user.lastName))
    errs.push("Last name only allows letters and spaces");

  if (!user.email || !validateEmail(user.email))
    errs.push("Valid email is required");
  else if (existingEmails.includes(user.email))
    errs.push("Email must be unique (no duplicates)");

  if (!user.password || !passwordRegex.test(user.password))
    errs.push(
      "Password must be at least 6 characters, include uppercase, lowercase, number, and special character"
    );

  if (!user.phone || !validatePhone(user.phone))
    errs.push("Phone is required and format must be valid");

  return errs;
}
