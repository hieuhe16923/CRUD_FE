import React from 'react';
import type { Status, ItemsPerPage } from '../../types';

interface StatusFilterProps {
    currentStatus: Status;
    onStatusChange: (status: Status) => void;
    loading: boolean;
    itemsPerPage: ItemsPerPage;
    onItemsPerPageChange: (value: ItemsPerPage) => void;
    totalItems: number;
}

export const StatusFilter: React.FC<StatusFilterProps> = ({
                                                              currentStatus,
                                                              onStatusChange,
                                                              loading,
                                                              itemsPerPage,
                                                              onItemsPerPageChange,
                                                          }) => {
    const statusLabels: Record<Status, string> = {
        available: 'Có sẵn',
        pending: 'Đang chờ',
        sold: 'Đã bán'
    };

    const statusButtonClass: Record<Status, string> = {
        available: 'btn-success',
        pending: 'btn-warning',
        sold: 'btn-danger'
    };

    // Tạo options text dựa trên screen size
    // const getOptionsText = () => {
    //     // Kiểm tra screen size (có thể dùng window.innerWidth hoặc CSS media queries)
    //     const isMobile = window.innerWidth < 768;
    //     return {
    //         3: isMobile ? '3' : '3 mục',
    //         6: isMobile ? '6' : '6 mục',
    //         9: isMobile ? '9' : '9 mục'
    //     };
    // };

    return (
        <div className="d-flex align-items-center gap-2 gap-md-3 flex-wrap flex-sm-nowrap">
            {/* Status filter buttons - responsive với CSS */}
            <div className="btn-group" role="group" style={{
                backgroundColor: '#f8f9fa',
                padding: '2px',
                borderRadius: '6px',
                border: '1px solid #dee2e6',
                flexShrink: 0
            }}>
                {(Object.keys(statusLabels) as Status[]).map((status) => (
                    <button
                        key={status}
                        type="button"
                        className={`btn btn-sm border-0 ${
                            currentStatus === status
                                ? `${statusButtonClass[status]} text-white`
                                : 'btn-light text-muted'
                        }`}
                        onClick={() => onStatusChange(status)}
                        disabled={loading}
                        style={{
                            fontSize: '0.75rem',
                            padding: '4px 8px',
                            backgroundColor: currentStatus === status
                                ? (status === 'available' ? '#28a745' : status === 'pending' ? '#ffc107' : '#dc3545')
                                : 'transparent',
                            minWidth: '0',
                            whiteSpace: 'nowrap'
                        }}
                    >
                        {loading && currentStatus === status && (
                            <span className="spinner-border spinner-border-sm me-1" role="status" aria-hidden="true"></span>
                        )}
                        {/* Responsive text - ẩn/hiện theo screen size */}
                        <span className="d-none d-sm-inline">{statusLabels[status]}</span>
                        <span className="d-inline d-sm-none">
                            {status === 'available' ? 'Sẵn' : status === 'pending' ? 'Chờ' : 'Bán'}
                        </span>
                    </button>
                ))}
            </div>

            {/* Items per page selector - responsive */}
            <div
                className="position-relative"
                style={{
                    border: '1px solid #dee2e6',
                    borderRadius: '6px',
                    backgroundColor: 'white',
                    flexShrink: 0
                }}
            >
                <select
                    className="form-select border-0"
                    value={itemsPerPage}
                    onChange={(e) =>
                        onItemsPerPageChange(Number(e.target.value) as ItemsPerPage)
                    }
                    style={{
                        background: 'transparent',
                        fontSize: '0.75rem',
                        minWidth: '50px',
                        padding: '4px 20px 4px 8px',
                        appearance: 'none',
                        outline: 'none'
                    }}
                >
                    {/* Chỉ sử dụng plain text, không có JSX elements */}
                    <option value={3}>3 mục</option>
                    <option value={6}>6 mục</option>
                    <option value={9}>9 mục</option>
                </select>
                {/* Custom dropdown arrow */}
                <div style={{
                    position: 'absolute',
                    right: '6px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    pointerEvents: 'none',
                    fontSize: '0.6rem',
                    color: '#6c757d'
                }}>
                    ▼
                </div>
            </div>
        </div>
    );
};