import React from 'react';
import { Alert } from 'react-bootstrap';

interface AlertMessageProps {
  message: string;
  variant: 'success' | 'danger' | 'warning' | 'info';
  dismissible?: boolean;
  onClose?: () => void;
  className?: string;
}

/**
 * Reusable alert message component
 * Displays success, error, warning, or info messages
 */
const AlertMessage: React.FC<AlertMessageProps> = ({
  message,
  variant,
  dismissible = false,
  onClose,
  className = ''
}) => {
  if (!message) return null;

  return (
    <Alert 
      variant={variant} 
      dismissible={dismissible} 
      onClose={onClose}
      className={className}
    >
      {message}
    </Alert>
  );
};

export default AlertMessage;
