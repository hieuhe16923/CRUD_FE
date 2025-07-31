import React from 'react';

interface ErrorPageProps {
  message?: string;
  statusCode?: number;
}

const ErrorPage: React.FC<ErrorPageProps> = ({
  message = 'Something went wrong.',
  statusCode = 500,
}) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center bg-gray-100">
      <h1 className="text-6xl font-bold text-red-500 mb-4">{statusCode}</h1>
      <p className="text-xl text-gray-700 mb-4">{message}</p>
      <a
        href="/"
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
      >
        Go Home
      </a>
    </div>
  );
};

export default ErrorPage;
