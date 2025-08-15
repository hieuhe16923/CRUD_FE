// components/common/Alerts.tsx
import React from 'react';
import { AlertCircle, WifiOff } from 'lucide-react';

interface ErrorAlertProps {
    message: string;
    onRetry?: () => void;
}

export const ErrorAlert: React.FC<ErrorAlertProps> = ({ message, onRetry }) => (
    <div className="alert alert-danger d-flex align-items-center" role="alert">
        <AlertCircle size={20} className="me-2" />
        <div className="flex-grow-1">{message}</div>
        {onRetry && (
            <button className="btn btn-outline-danger btn-sm ms-2" onClick={onRetry}>
                Thử lại
            </button>
        )}
    </div>
);

export const OfflineAlert: React.FC = () => (
    <div className="alert alert-warning d-flex align-items-center" role="alert">
        <WifiOff size={20} className="me-2" />
        <span>Bạn đang offline. Vui lòng kiểm tra kết nối mạng.</span>
    </div>
);