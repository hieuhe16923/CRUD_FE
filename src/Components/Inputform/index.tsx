import React, { useEffect, useState } from 'react';
import { ValidatedInputProps } from '../../Types/InputTypes';

const ValidatedInput: React.FC<ValidatedInputProps> = ({
  label,
  placeholder,
  validationFn,
  value,
  setValue,
  submitted,
}) => {
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (submitted) {
      const validationError = validationFn(value);
      setError(validationError);
    }
  }, [submitted, value]);

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={e => setValue(e.target.value)}
        className={`w-full p-2 border rounded-md focus:outline-none ${
          error ? 'border-red-500' : 'border-gray-300'
        }`}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default ValidatedInput;
