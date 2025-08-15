import React from 'react';
import type {PetStatus, StatusFilterPropsDto} from '../types';
import ItemsSelector from "./ItemsSelector.tsx";


export const StatusFilter: React.FC<StatusFilterPropsDto> = ({
                                                              currentStatus,
                                                              onStatusChange,
                                                              loading,
                                                              itemsPerPage,
                                                              onItemsPerPageChange,
                                                          }) => {
    const statusLabels: Record<PetStatus, string> = {
        available: 'Có sẵn',
        pending: 'Đang chờ',
        sold: 'Đã bán'
    };

    const statusButtonClass: Record<PetStatus, string> = {
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
                {(Object.keys(statusLabels) as PetStatus[]).map((status) => (
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
            <ItemsSelector
                value={itemsPerPage}
                onChange={onItemsPerPageChange}
                disabled={loading}
            />
        </div>
    );
};