import React from 'react';
import { Button, Spinner } from 'react-bootstrap';

interface LoadingButtonProps {
  loading: boolean;
  children: React.ReactNode;
  variant?: string;
  size?: 'sm' | 'lg';
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
  loadingText?: string;
}

/**
 * Reusable button component with loading state
 * Shows spinner and optional loading text when loading is true
 */
const LoadingButton: React.FC<LoadingButtonProps> = ({
  loading,
  children,
  variant = 'primary',
  size,
  type = 'button',
  className = '',
  disabled = false,
  onClick,
  loadingText
}) => {
  return (
    <Button
      variant={variant}
      size={size}
      type={type}
      className={className}
      disabled={loading || disabled}
      onClick={onClick}
    >
      {loading && (
        <>
          <Spinner
            as="span"
            animation="border"
            size="sm"
            role="status"
            aria-hidden="true"
            className="me-2"
          />
          {loadingText || 'Loading...'}
        </>
      )}
      {!loading && children}
    </Button>
  );
};

export default LoadingButton;
