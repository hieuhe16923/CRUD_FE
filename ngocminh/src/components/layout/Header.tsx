import React from 'react';
import { Wifi, WifiOff } from 'lucide-react';
import type {ItemsPerPage, Status} from '../../types';
import { StatusFilter } from '../filters/StatusFilter';

interface HeaderProps {
    isOnline: boolean;
    currentStatus: Status;
    onStatusChange: (status: Status) => void;
    loading: boolean;
    itemsPerPage: ItemsPerPage;
    onItemsPerPageChange: (items: ItemsPerPage) => void;
    totalItems: number;
}

export const Header: React.FC<HeaderProps> = ({
                                                  isOnline,
                                                  currentStatus,
                                                  onStatusChange,
                                                  loading,
                                                  itemsPerPage,
                                                  onItemsPerPageChange,
                                                  totalItems,
                                              }) => {

    const statusLabels: Record<Status, string> = {
        available: 'có sẵn',
        pending: 'đang chờ',
        sold: 'đã bán'
    };

    return (
        <div className="bg-white border-bottom">
            {/* Container với padding để thẳng hàng với cards */}
            <div className="container" style={{ maxWidth: '1200px' }}>
                <div className="row py-3">
                    <div className="col-12">
                        {/* Top nav with logo and nav links */}
                        <div className="d-flex align-items-center justify-content-between mb-3">
                            {/* Logo and nav links */}
                            <div className="d-flex align-items-center">
                                <span className="me-3" style={{ fontSize: '24px' }}>🐾</span>
                                <nav className="d-flex gap-4">
                                    <button
                                        className={`btn btn-link text-decoration-none p-0 ${currentStatus === 'available' ? 'text-success fw-semibold' : 'text-muted'}`}
                                        onClick={() => onStatusChange('available')}
                                    >
                                        Có sẵn
                                    </button>
                                    <button
                                        className={`btn btn-link text-decoration-none p-0 ${currentStatus === 'pending' ? 'text-warning fw-semibold' : 'text-muted'}`}
                                        onClick={() => onStatusChange('pending')}
                                    >
                                        Đang chờ
                                    </button>
                                    <button
                                        className={`btn btn-link text-decoration-none p-0 ${currentStatus === 'sold' ? 'text-danger fw-semibold' : 'text-muted'}`}
                                        onClick={() => onStatusChange('sold')}
                                    >
                                        Đã bán
                                    </button>
                                </nav>
                            </div>

                            {/* Online status */}
                            <div className="d-flex align-items-center">
                                {isOnline ? (
                                    <div className="d-flex align-items-center text-success">
                                        <Wifi size={16} className="me-2" />
                                        <small>Online</small>
                                    </div>
                                ) : (
                                    <div className="d-flex align-items-center text-warning">
                                        <WifiOff size={16} className="me-2" />
                                        <small>Offline</small>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Page title and filters - thẳng hàng với cards */}
                        <div className="d-flex align-items-center justify-content-between">
                            <h1 className="h4 mb-0">
                                Động vật {statusLabels[currentStatus]}
                            </h1>

                            {/* Filter section - thẳng hàng với edge của cards */}
                            <div className="d-flex align-items-center gap-3">
                                <StatusFilter
                                    currentStatus={currentStatus}
                                    onStatusChange={onStatusChange}
                                    loading={loading}
                                    itemsPerPage={itemsPerPage}
                                    onItemsPerPageChange={onItemsPerPageChange}
                                    totalItems={totalItems}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};