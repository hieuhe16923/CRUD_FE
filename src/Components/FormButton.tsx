// src/components/FormButton.tsx
import React from 'react';
import Loading from './Loading';

interface FormButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  text: string;
}

export default function FormButton({
  loading,
  text,
  ...props
}: FormButtonProps) {
  return (
    <button
      {...props}
      disabled={loading || props.disabled}
      className={`w-full py-2 rounded text-white transition ${
        loading
          ? 'bg-gray-400 cursor-not-allowed'
          : 'bg-blue-500 hover:bg-blue-600'
      } ${props.className || ''}`}
    >
      {loading ? <Loading /> : text}
    </button>
  );
}
