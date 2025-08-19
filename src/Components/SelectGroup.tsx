/* eslint-disable no-unused-vars */
// SelectGroup.tsx
import React from 'react';
import { SelectOption } from '../types';

interface SelectGroupProps {
  label: string;
  name: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: SelectOption[];
  error?: string;
  disabled?: boolean; // This prop is correctly defined
}

const SelectGroup: React.FC<SelectGroupProps> = ({
  label,
  name,
  value,
  onChange,
  options,
  error,
  disabled, // Make sure to destructure the 'disabled' prop
}) => {
  return (
    <div>
      <label
        htmlFor={name}
        className="block text-sm font-medium text-gray-700 mb-2"
      >
        {label}
      </label>
      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        // Add the `disabled` attribute here to apply it to the select element
        disabled={disabled}
        className={`w-full px-4 py-2 border ${
          error ? 'border-red-500' : 'border-gray-300'
        } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white appearance-none pr-8 transition duration-150 ease-in-out ${
          // Optional: Add a style for the disabled state
          disabled ? 'bg-gray-100 cursor-not-allowed' : ''
        }`}
      >
        <option value="">Select {label.toLowerCase()}</option>
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default SelectGroup;
