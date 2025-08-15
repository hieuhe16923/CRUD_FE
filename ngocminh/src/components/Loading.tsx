// components/common/Loading.tsx
import React from 'react';

export const LoadingSpinner: React.FC = () => (
    <div className="d-flex justify-content-center align-items-center py-5">
        <div className="spinner-border text-success" role="status">
            <span className="visually-hidden">Loading...</span>
        </div>
        <span className="ms-2">Đang tải dữ liệu...</span>
    </div>
);

export const LoadingBar: React.FC = () => (
    <div className="position-fixed top-0 start-0 w-100" style={{ zIndex: 1050 }}>
        <div className="progress" style={{ height: '3px' }}>
            <div
                className="progress-bar progress-bar-striped progress-bar-animated bg-success"
                style={{ width: '100%' }}
            />
        </div>
    </div>
);