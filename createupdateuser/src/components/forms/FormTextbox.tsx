import React from 'react';
import { Form } from 'react-bootstrap';

interface FormTextboxProps {
  label: string;
  name: string;
  type?: 'text' | 'email' | 'password' | 'tel' | 'number' | 'url';
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  autoComplete?: string;
  error?: string;
  validation?: 'email' | 'phone' | 'url' | 'required' | 'number';
  showErrors?: boolean; // New prop to control when errors are shown
}

// Validation regex patterns
const validationPatterns = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  phone: /^\+?[\d\s\-()]{10,}$/,
  url: /^https?:\/\/.+\..+/
};

// Validation messages
const validationMessages = {
  email: 'Please enter a valid email address',
  phone: 'Please enter a valid phone number (10+ digits)',
  url: 'Please enter a valid URL (starting with http:// or https://)',
  required: 'This field is required',
  number: 'Please enter a valid number'
};

/**
 * Reusable form textbox component with built-in validation
 * Includes label, input field, and error display below the textbox
 */
const FormTextbox: React.FC<FormTextboxProps> = ({
  label,
  name,
  type = 'text',
  value,
  onChange,
  placeholder,
  disabled = false,
  className = 'mb-3',
  autoComplete,
  error,
  validation,
  showErrors = true, // Default to true for backward compatibility
}) => {
  // Validate input based on validation type
  const validateInput = (inputValue: string | number): string | undefined => {
    const stringValue = String(inputValue);
    
    if (!stringValue.trim() && validation === 'required') {
      return validationMessages.required;
    }
    
    if (stringValue.trim() && validation && validation in validationPatterns) {
      const pattern = validationPatterns[validation as keyof typeof validationPatterns];
      if (!pattern.test(stringValue)) {
        return validationMessages[validation as keyof typeof validationMessages];
      }
    }
    
    if (type === 'number' && stringValue && isNaN(Number(stringValue))) {
      return validationMessages.number;
    }
    
    return undefined;
  };

  // Get validation error (prioritize external error over internal validation)
  const validationError = error || validateInput(value);
  const hasError = showErrors && !!validationError;

  return (
    <Form.Group className={className}>
      <Form.Label>
        {label}
        {validation === 'required' && <span className="text-danger"> *</span>}
      </Form.Label>
      <Form.Control
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        autoComplete={autoComplete}
        isInvalid={hasError}
        className={hasError ? 'is-invalid' : ''}
      />
      {hasError && validationError && (
        <div className="invalid-feedback d-block text-danger mt-1">
          {validationError}
        </div>
      )}
    </Form.Group>
  );
};

export default FormTextbox;
