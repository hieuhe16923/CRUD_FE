// components/pagination/Pagination.tsx
import React from 'react';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    loading?: boolean; // Thêm loading prop
}

export const Pagination: React.FC<PaginationProps> = ({
                                                          currentPage,
                                                          totalPages,
                                                          onPageChange,
                                                          loading = false
                                                      }) => {
    const getVisiblePages = () => {
        const delta = 1; // Giảm delta để tiết kiệm space trên mobile
        const rangeWithDots = [];

        // Nếu totalPages <= 5, hiển thị tất cả (mobile friendly)
        if (totalPages <= 5) {
            for (let i = 1; i <= totalPages; i++) {
                rangeWithDots.push(i);
            }
            return rangeWithDots;
        }

        // Case 1: Current page gần đầu (1, 2, 3)
        if (currentPage <= 3) {
            for (let i = 1; i <= 4; i++) {
                rangeWithDots.push(i);
            }
            rangeWithDots.push('...');
            rangeWithDots.push(totalPages);
            return rangeWithDots;
        }

        // Case 2: Current page gần cuối
        if (currentPage >= totalPages - 2) {
            rangeWithDots.push(1);
            rangeWithDots.push('...');
            for (let i = totalPages - 3; i <= totalPages; i++) {
                rangeWithDots.push(i);
            }
            return rangeWithDots;
        }

        // Case 3: Current page ở giữa
        rangeWithDots.push(1);
        rangeWithDots.push('...');
        for (let i = currentPage - delta; i <= currentPage + delta; i++) {
            rangeWithDots.push(i);
        }
        rangeWithDots.push('...');
        rangeWithDots.push(totalPages);

        return rangeWithDots;
    };

    const handlePageClick = (page: number) => {
        if (loading || currentPage === page) return;
        onPageChange(page);
    };

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '16px',
                marginTop: '32px',
            }}
        >
            {totalPages > 1 && (
                <nav>
                    <ul
                        style={{
                            listStyle: 'none',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px', // Giảm gap cho mobile
                            padding: 0,
                            margin: 0,
                            flexWrap: 'wrap',
                            justifyContent: 'center'
                        }}
                    >
                        {/* Previous Button - theo figma: không viền, có arrow */}
                        <li>
                            <button
                                type="button"
                                onClick={() => handlePageClick(currentPage - 1)}
                                disabled={currentPage === 1 || loading}
                                style={{
                                    padding: '8px 12px',
                                    border: 'none',
                                    background: 'transparent',
                                    color: (currentPage === 1 || loading) ? '#ccc' : '#666',
                                    cursor: (currentPage === 1 || loading) ? 'not-allowed' : 'pointer',
                                    opacity: loading ? 0.7 : 1,
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '4px',
                                    fontSize: '14px',
                                    fontWeight: '500'
                                }}
                            >
                                <span style={{ fontSize: '18px' }}>‹</span>
                                <span className="d-none d-sm-inline">Previous</span>
                                <span className="d-inline d-sm-none">Prev</span>

                            </button>
                        </li>

                        {/* Page Numbers */}
                        {getVisiblePages().map((page, index) => (
                            <li key={index}>
                                {page === '...' ? (
                                    <span
                                        style={{
                                            padding: '8px 4px',
                                            color: '#999',
                                            fontSize: '14px'
                                        }}
                                    >
                                        ...
                                    </span>
                                ) : (
                                    <button
                                        type="button"
                                        onClick={() => handlePageClick(page as number)}
                                        disabled={loading}
                                        style={{
                                            padding: '8px 12px',
                                            borderRadius: '6px',
                                            border: '1px solid #e5e5e5', // Viền mỏng hơn
                                            backgroundColor: currentPage === page ? '#007bff' : 'white', // Background trắng
                                            color: currentPage === page ? 'white' : '#333',
                                            fontWeight: currentPage === page ? '600' : '500',
                                            cursor: (currentPage === page || loading) ? 'default' : 'pointer',
                                            opacity: loading ? 0.7 : 1,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            minWidth: '36px', // Nhỏ hơn cho mobile
                                            minHeight: '36px',
                                            fontSize: '14px',
                                            transition: 'all 0.2s ease',
                                            boxShadow: currentPage === page ? '0 2px 4px rgba(0,123,255,0.2)' : 'none'
                                        }}
                                    >
                                        {loading && currentPage === page ? (
                                            <div
                                                style={{
                                                    width: '16px',
                                                    height: '16px',
                                                    border: '2px solid rgba(255,255,255,0.3)',
                                                    borderTop: '2px solid white',
                                                    borderRadius: '50%',
                                                    animation: 'spin 1s linear infinite'
                                                }}
                                            />
                                        ) : (
                                            page
                                        )}
                                    </button>
                                )}
                            </li>
                        ))}

                        {/* Next Button - theo figma: không viền, có arrow */}
                        <li>
                            <button
                                type="button"
                                onClick={() => handlePageClick(currentPage + 1)}
                                disabled={currentPage === totalPages || loading}
                                style={{
                                    padding: '8px 12px',
                                    border: 'none',
                                    background: 'transparent',
                                    color: (currentPage === totalPages || loading) ? '#ccc' : '#666',
                                    cursor: (currentPage === totalPages || loading) ? 'not-allowed' : 'pointer',
                                    opacity: loading ? 0.7 : 1,
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '4px',
                                    fontSize: '14px',
                                    fontWeight: '500'
                                }}
                            >
                                <span className="d-none d-sm-inline">Next</span>
                                <span className="d-inline d-sm-none">Next</span>
                                <span style={{ fontSize: '18px' }}>›</span>

                            </button>
                        </li>
                    </ul>
                </nav>
            )}

            {/* CSS Animation */}
            <style>{`
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            `}</style>
        </div>
    );
};