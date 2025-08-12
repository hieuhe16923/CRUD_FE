import React from 'react';
import { CustomInputProps } from '../Types/InputTypes';

const CustomInput: React.FC<CustomInputProps> = ({
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

export default CustomInput;
