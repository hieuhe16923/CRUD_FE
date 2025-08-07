// components/pagination/Pagination.tsx
import React from 'react';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
                                                          currentPage,
                                                          totalPages,
                                                          onPageChange,
                                                      }) => {
    const getVisiblePages = () => {
        const delta = 2;
        const range = [];
        const rangeWithDots = [];

        for (
            let i = Math.max(2, currentPage - delta);
            i <= Math.min(totalPages - 1, currentPage + delta);
            i++
        ) {
            range.push(i);
        }

        if (currentPage - delta > 2) {
            rangeWithDots.push(1, '...');
        } else {
            rangeWithDots.push(1);
        }

        rangeWithDots.push(...range);

        if (currentPage + delta < totalPages - 1) {
            rangeWithDots.push('...', totalPages);
        } else if (totalPages > 1) {
            rangeWithDots.push(totalPages);
        }

        return rangeWithDots.filter((v, i, a) => a.indexOf(v) === i);
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
                            gap: '8px',
                            padding: 0,
                            margin: 0,
                        }}
                    >
                        <li>
                            <button
                                type="button"
                                onClick={() => onPageChange(currentPage - 1)}
                                disabled={currentPage === 1}
                                style={{
                                    padding: '6px 12px',
                                    borderRadius: '8px',
                                    border: '1px solid #ccc',
                                    backgroundColor: currentPage === 1 ? '#f0f0f0' : 'white',
                                    cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                                }}
                            >
                                Prev
                            </button>
                        </li>

                        {getVisiblePages().map((page, index) => (
                            <li key={index}>
                                {page === '...' ? (
                                    <span
                                        style={{
                                            padding: '6px 12px',
                                            color: '#999',
                                        }}
                                    >
                                        ...
                                    </span>
                                ) : (
                                    <button
                                        type="button"
                                        onClick={() => onPageChange(page as number)}
                                        style={{
                                            padding: '6px 12px',
                                            borderRadius: '8px',
                                            border: '1px solid #ccc',
                                            backgroundColor:
                                                currentPage === page ? '#007bff' : 'white',
                                            color:
                                                currentPage === page ? 'white' : '#333',
                                            fontWeight: currentPage === page ? '600' : 'normal',
                                            cursor:
                                                currentPage === page ? 'default' : 'pointer',
                                        }}
                                        disabled={currentPage === page}
                                    >
                                        {page}
                                    </button>
                                )}
                            </li>
                        ))}

                        <li>
                            <button
                                type="button"
                                onClick={() => onPageChange(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                style={{
                                    padding: '6px 12px',
                                    borderRadius: '8px',
                                    border: '1px solid #ccc',
                                    backgroundColor:
                                        currentPage === totalPages ? '#f0f0f0' : 'white',
                                    cursor:
                                        currentPage === totalPages ? 'not-allowed' : 'pointer',
                                }}
                            >
                                Next
                            </button>
                        </li>
                    </ul>
                </nav>
            )}
        </div>
    );
};