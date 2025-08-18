import React from 'react';

interface CustomInputProps {
  label?: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string;
  className?: string;
  required?: boolean;
}

const FormInput: React.FC<CustomInputProps> = ({
  label,
  name,
  value,
  onChange,
  type = 'text',
  className = '',
  required,
}) => {
  return (
    <div>
      {label && <label className="block mb-1 font-medium">{label}</label>}
      <input
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        min={0}
        className={`w-full px-4 py-3 border border-gray-300 rounded-lg ${className}`}
      />
    </div>
  );
};

export default FormInput;
