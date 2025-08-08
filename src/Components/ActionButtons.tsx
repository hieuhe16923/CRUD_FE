// ActionButtons.tsx
import React from 'react';

interface ActionButtonsProps {
  onCancel: () => void;
  isSubmitting: boolean;
  submitText: string;
  cancelText?: string;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({
  onCancel,
  isSubmitting,
  submitText,
  cancelText = 'Hủy',
}) => {
  return (
    <div className="flex justify-end space-x-4 pt-6">
      <button
        type="button"
        onClick={onCancel}
        disabled={isSubmitting}
        className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-150 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {cancelText}
      </button>
      <button
        type="submit"
        disabled={isSubmitting}
        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-150 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
      >
        {isSubmitting && (
          <svg
            className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        )}
        {submitText}
      </button>
    </div>
  );
};

export default ActionButtons;
