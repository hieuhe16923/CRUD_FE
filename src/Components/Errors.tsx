import React from 'react';

interface ErrorPageProps {
  message?: string;
  statusCode?: number;
}

const ErrorPage: React.FC<ErrorPageProps> = ({
  message = 'Something went wrong.',
}) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <p className="text-lg text-gray-700">{message}</p>
    </div>
  );
};

export default ErrorPage;
