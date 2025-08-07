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
                                                              totalItems,
                                                          }) => {
    const statusLabels: Record<Status, string> = {
        available: 'Có sẵn',
        pending: 'Đang chờ',
        sold: 'Đã bán'
    };

    const statusColors: Record<Status, string> = {
        available: 'success',
        pending: 'warning',
        sold: 'danger'
    };

    return (
        <div className="d-flex flex-wrap justify-content-between align-items-center mb-4 gap-3">
            <div className="d-flex flex-wrap gap-2">
                {(Object.keys(statusLabels) as Status[]).map((status) => (
                    <button
                        key={status}
                        type="button"
                        className={`btn ${
                            currentStatus === status
                                ? `btn-${statusColors[status]}`
                                : `btn-outline-${statusColors[status]}`
                        }`}
                        onClick={() => onStatusChange(status)}
                        disabled={loading}
                    >
                        {loading && currentStatus === status && (
                            <span className="spinner-border spinner-border-sm me-2" />
                        )}
                        {statusLabels[status]}
                    </button>
                ))}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span>Hiển thị:</span>
                <select
                    value={itemsPerPage}
                    onChange={(e) =>
                        onItemsPerPageChange(Number(e.target.value) as ItemsPerPage)
                    }
                    style={{
                        padding: '4px 8px',
                        borderRadius: '8px',
                        border: '1px solid #ccc',
                        fontSize: '14px',
                    }}
                >
                    <option value={3}>3</option>
                    <option value={6}>6</option>
                    <option value={9}>9</option>
                </select>
                <span style={{ color: '#666', fontSize: '14px' }}>
                    ({totalItems} tổng cộng)
                </span>
            </div>
        </div>
    );
};
