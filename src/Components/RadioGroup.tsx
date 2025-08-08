/* eslint-disable no-unused-vars */
// RadioGroup.tsx
import React from 'react';
import { SelectOption } from '../types'; // Import SelectOption from types.ts

interface RadioGroupProps {
  label: string;
  name: string;
  selectedValue: string;
  onChange: (value: string) => void;
  options: SelectOption[];
}

const RadioGroup: React.FC<RadioGroupProps> = ({
  label,
  name,
  selectedValue,
  onChange,
  options,
}) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-3">
        {label}
      </label>
      <div className="flex flex-wrap gap-6">
        {options.map(option => (
          <label
            key={option.value}
            className="flex items-center cursor-pointer"
          >
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={selectedValue === option.value}
              onChange={() => onChange(option.value as string)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded-full transition duration-150 ease-in-out"
            />
            <span className="ml-2 text-sm text-gray-700">{option.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default RadioGroup;
