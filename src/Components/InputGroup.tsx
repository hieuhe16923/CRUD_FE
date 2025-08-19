/* eslint-disable no-unused-vars */
// InputGroup.tsx
import React from 'react';

interface InputGroupProps {
  label: string;
  name: string;
  value: string | number;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  placeholder?: string;
  type?: 'text' | 'number' | 'email' | 'password';
  rows?: number;
  error?: string | null; // 💡 Đã sửa: Cho phép error là string, undefined hoặc null
  readOnly?: boolean;
}

const InputGroup: React.FC<InputGroupProps> = ({
  label,
  name,
  value,
  onChange,
  placeholder,
  type = 'text',
  rows,
  error,
  readOnly = false,
}) => {
  const InputComponent = rows ? 'textarea' : 'input';
  return (
    <div>
      <label
        htmlFor={name}
        className="block text-sm font-medium text-gray-700 mb-2"
      >
        {label}
      </label>
      <InputComponent
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        type={type}
        rows={rows}
        readOnly={readOnly}
        className={`w-full px-4 py-2 border ${
          error ? 'border-red-500' : 'border-gray-300'
        } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-150 ease-in-out ${
          readOnly ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'
        }`}
      />
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default InputGroup;
