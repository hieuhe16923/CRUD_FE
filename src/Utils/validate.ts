export const validateEmail = (value: string): string | null => {
  if (!value) return 'Email is required';
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(value) ? null : 'Invalid email format';
};

export const validatePhone = (value: string): string | null => {
  if (!value) return 'Phone is required';
  const phoneRegex = /^(0|\+84)\d{9}$/;
  return phoneRegex.test(value) ? null : 'Invalid phone format';
};

export const validatePassword = (value: string): string | null => {
  if (!value) {
    return 'Password is required';
  }

  if (value.length < 6) {
    return 'Password must be at least 6 characters';
  }

  if (!/[a-z]/.test(value)) {
    return 'Password must contain at least one lowercase letter';
  }

  if (!/[A-Z]/.test(value)) {
    return 'Password must contain at least one uppercase letter';
  }

  if (!/[0-9]/.test(value)) {
    return 'Password must contain at least one digit';
  }

  if (!/[!@#$%^&*]/.test(value)) {
    return 'Password must contain at least one special character (!@#$%^&*)';
  }

  return null; // hợp lệ
};
