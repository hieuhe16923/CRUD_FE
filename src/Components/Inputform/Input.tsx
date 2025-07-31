import React, { useEffect, useState } from 'react';
import { ValidatedInputProps } from '../../Types/InputTypes';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const ValidatedInput: React.FC<ValidatedInputProps> = ({
  id,
  label,
  placeholder,
  value,
  setValue,
  validationFn,
  submitted,
  type = 'text',
}) => {
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (submitted) {
      const validationError = validationFn(value);
      setError(validationError);
    }
  }, [submitted, value]);

  const inputType =
    type === 'password' ? (showPassword ? 'text' : 'password') : type;

  return (
    <div className="mb-4 relative">
      <label
        htmlFor={id}
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label}
      </label>

      <input
        id={id}
        type={inputType}
        placeholder={placeholder}
        autoComplete="current-password"
        value={value}
        onChange={e => setValue(e.target.value)}
        className={`w-full p-2 border rounded-md focus:outline-none ${
          error ? 'border-red-500' : 'border-gray-300'
        }`}
      />

      {type === 'password' && (
        <span
          role="button"
          aria-label="Toggle password visibility"
          tabIndex={0}
          className="absolute right-3 top-[38px] cursor-pointer text-gray-600"
          onClick={() => setShowPassword(prev => !prev)}
          onKeyDown={e => {
            if (e.key === 'Enter' || e.key === ' ') {
              setShowPassword(prev => !prev);
            }
          }}
        >
          {showPassword ? <FaEye /> : <FaEyeSlash />}
        </span>
      )}

      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default ValidatedInput;
