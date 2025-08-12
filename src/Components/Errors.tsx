import React from 'react';

interface ErrorPageProps {
  message?: string;
  statusCode?: number;
}

const ErrorPage: React.FC<ErrorPageProps> = ({
  message = 'Something went wrong.',
  statusCode,
}) => {
  const getErrorIcon = () => {
    if (statusCode === 404) return '🔍';
    if (statusCode === 500) return '⚠️';
    if (statusCode === 403) return '🔒';
    return '❌';
  };

  const getErrorTitle = () => {
    if (statusCode === 404) return 'Page Not Found';
    if (statusCode === 500) return 'Server Error';
    if (statusCode === 403) return 'Access Denied';
    return 'Oops! Something went wrong';
  };

  const getErrorDescription = () => {
    if (statusCode === 404) return "The page you're looking for doesn't exist.";
    if (statusCode === 500) return 'Our servers are having trouble right now.';
    if (statusCode === 403)
      return "You don't have permission to access this resource.";
    return 'We encountered an unexpected error. Please try again.';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        {/* Animated error icon */}
        <div className="mb-8 animate-bounce">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-white rounded-full shadow-lg border-4 border-red-100">
            <span className="text-4xl">{getErrorIcon()}</span>
          </div>
        </div>

        {/* Status code */}
        {statusCode && (
          <div className="mb-4">
            <span className="inline-block px-4 py-2 bg-red-100 text-red-600 rounded-full text-sm font-semibold">
              Error {statusCode}
            </span>
          </div>
        )}

        {/* Error title */}
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          {getErrorTitle()}
        </h1>

        {/* Error description */}
        <p className="text-gray-600 mb-2 leading-relaxed">
          {getErrorDescription()}
        </p>

        {/* Custom message */}
        {message !== 'Something went wrong.' && (
          <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-700 text-sm font-medium">{message}</p>
          </div>
        )}

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center mt-8">
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            Try Again
          </button>
          <button
            onClick={() => window.history.back()}
            className="px-6 py-3 bg-white text-gray-700 border border-gray-300 rounded-xl font-medium hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg"
          >
            Go Back
          </button>
        </div>

        {/* Contact info */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            Still having trouble?{' '}
            <a
              href="mailto:support@example.com"
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Contact Support
            </a>
          </p>
        </div>
      </div>

      {/* Floating elements for visual appeal */}
      <div className="absolute top-20 left-10 w-4 h-4 bg-blue-200 rounded-full opacity-60 animate-pulse"></div>
      <div className="absolute top-40 right-20 w-6 h-6 bg-purple-200 rounded-full opacity-40 animate-pulse delay-1000"></div>
      <div className="absolute bottom-20 left-20 w-5 h-5 bg-pink-200 rounded-full opacity-50 animate-pulse delay-500"></div>
    </div>
  );
};

export default ErrorPage;
