/* eslint-disable no-unused-vars */
// SelectGroup.tsx
import React from 'react';
import { SelectOption } from '../types'; // Import SelectOption from types.ts

interface SelectGroupProps {
  label: string;
  name: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: SelectOption[];
  error?: string;
}

const SelectGroup: React.FC<SelectGroupProps> = ({
  label,
  name,
  value,
  onChange,
  options,
  error,
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
        className={`w-full px-4 py-2 border ${
          error ? 'border-red-500' : 'border-gray-300'
        } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white appearance-none pr-8 transition duration-150 ease-in-out`}
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
