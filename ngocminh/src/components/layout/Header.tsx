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

    return (
        <div style={{
            backgroundColor: 'white',
            borderBottom: '1px solid #e0e0e0',
            padding: '16px 0'
        }}>
            <div style={{
                maxWidth: '1200px',
                margin: '0 auto',
                padding: '0 20px'
            }}>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: '100%'
                }}>
                    {/* Logo và tiêu đề */}
                    <div style={{
                        display: 'flex',
                        alignItems: 'center'
                    }}>
                        <div style={{
                            width: '40px',
                            height: '40px',
                            borderRadius: '8px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginRight: '12px',
                            fontSize: '20px'
                        }}>
                            🐾
                        </div>
                        <h1 style={{
                            margin: 0,
                            fontSize: '24px',
                            fontWeight: '600',
                            color: '#333'
                        }}>
                            Động vật
                        </h1>
                    </div>

                    {/* Status kết nối */}
                    <div style={{
                        display: 'flex',
                        alignItems: 'center'
                    }}>
                        {isOnline ? (
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                color: '#28a745',
                                fontSize: '14px'
                            }}>
                                <Wifi size={16} style={{ marginRight: '6px' }} />
                                <span>Online</span>
                            </div>
                        ) : (
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                color: '#ffc107',
                                fontSize: '14px'
                            }}>
                                <WifiOff size={16} style={{ marginRight: '6px' }} />
                                <span>Offline</span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Status Filter */}
                <div style={{
                    marginTop: '16px',
                    borderTop: '1px solid #f0f0f0',
                    paddingTop: '16px'
                }}>
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
    );
};