import React, { useState, useEffect } from 'react';
import type { Pet, Status, ItemsPerPage } from '../types';
import { useOnlineStatus } from '../hooks/useOnlineStatus';
import { petService } from '../services/petService';
import { LoadingSpinner, LoadingBar } from '../components/common/Loading';
import { ErrorAlert, OfflineAlert } from '../components/common/Alerts';
import { PetCard } from '../components/cards/PetCard';
import { Pagination } from '../components/pagination/Pagination';
import { Header } from '../components/layout/Header';

const DogBreedsApp: React.FC = () => {
    const [pets, setPets] = useState<Pet[]>([]);
    const [filteredPets, setFilteredPets] = useState<Pet[]>([]);
    const [currentStatus, setCurrentStatus] = useState<Status>('available');
    const [loading, setLoading] = useState(false);
    const [paginationLoading, setPaginationLoading] = useState(false); // Thêm loading riêng cho pagination
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState<ItemsPerPage>(3);
    const isOnline = useOnlineStatus();

    const totalPages = Math.ceil(filteredPets.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentPets = filteredPets.slice(startIndex, endIndex);

    const fetchPets = async (status: Status, signal: AbortSignal) => {
        if (!isOnline) {
            setError('Không có kết nối mạng');
            return;
        }

        setLoading(true);
        setError(null);
        setPets([]);
        setFilteredPets([]);

        try {
            const data = await petService.fetchPetsByStatus(status);
            if (!signal.aborted) {
                console.log(`Nhận ${data.length} pet từ petService cho trạng thái ${status}`, data);
                setPets(data);
                setFilteredPets(data);
                console.log(`Đặt filteredPets: ${data.length} pet`);
                setCurrentPage(1);
            }
        } catch (err) {
            if (!signal.aborted) {
                const message = err instanceof Error ? err.message : 'Có lỗi xảy ra';
                setError(message);
                setPets([]);
                setFilteredPets([]);
            }
        } finally {
            if (!signal.aborted) {
                setLoading(false);
            }
        }
    };

    useEffect(() => {
        const controller = new AbortController();
        fetchPets(currentStatus, controller.signal);
        return () => {
            controller.abort();
        };
    }, [currentStatus, isOnline]);

    // Debug filteredPets mỗi khi thay đổi
    useEffect(() => {
        console.log(`filteredPets hiện tại: ${filteredPets.length} pet`, filteredPets);
    }, [filteredPets]);

    useEffect(() => {
        setFilteredPets(pets); // Giữ nguyên tất cả pet
    }, [pets]);

    const handleStatusChange = (status: Status) => {
        setCurrentStatus(status);
    };

    const handlePageChange = async (page: number) => {
        if (paginationLoading) return; // Ngăn chặn multiple clicks

        setPaginationLoading(true);

        // Tăng loading delay từ 300ms lên 500ms để thấy rõ hơn
        await new Promise(resolve => setTimeout(resolve, 500));

        setCurrentPage(page);
        setPaginationLoading(false);

        // Scroll to top với animation mượt
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleItemsPerPageChange = (items: ItemsPerPage) => {
        setItemsPerPage(items);
        setCurrentPage(1);
    };

    const handleRetry = () => {
        const controller = new AbortController();
        fetchPets(currentStatus, controller.signal);
    };

    return (
        <div className="min-vh-100 bg-light">
            {(loading || paginationLoading) && <LoadingBar />}

            {/* Header - sẽ có container riêng bên trong */}
            <Header
                isOnline={isOnline}
                currentStatus={currentStatus}
                onStatusChange={handleStatusChange}
                loading={loading}
                itemsPerPage={itemsPerPage}
                onItemsPerPageChange={handleItemsPerPageChange}
                totalItems={filteredPets.length}
            />

            {/* Main Content - QUAN TRỌNG: Dùng cùng container với Header */}
            <div className="container" style={{ maxWidth: '1200px' }}>
                <div className="py-4">
                    {!isOnline && (
                        <div className="mb-4">
                            <OfflineAlert />
                        </div>
                    )}

                    {error && (
                        <div className="mb-4">
                            <ErrorAlert
                                message={error}
                                onRetry={isOnline ? handleRetry : undefined}
                            />
                        </div>
                    )}

                    {loading && (
                        <div className="d-flex justify-content-center py-5">
                            <LoadingSpinner />
                        </div>
                    )}

                    {!loading && !error && filteredPets.length === 0 && (
                        <div className="text-center py-5">
                            <div style={{ fontSize: '48px' }} className="mb-3">🐾</div>
                            <h4 className="mb-2 text-dark">Không có dữ liệu</h4>
                            <p className="text-muted">Không tìm thấy động vật nào với trạng thái này.</p>
                        </div>
                    )}

                    {!loading && !error && currentPets.length > 0 && (
                        <>
                            {/* Pet Grid - Dùng Bootstrap Grid System */}
                            <div className="row g-4 mb-4">
                                {paginationLoading ? (
                                    // Hiển thị loading skeleton cho pet cards
                                    Array.from({ length: itemsPerPage }).map((_, index) => (
                                        <div key={`loading-${index}`} className="col-lg-4 col-md-6 col-sm-12">
                                            <div className="card h-100 shadow-sm">
                                                <div className="card-header bg-white d-flex justify-content-center align-items-center border-bottom" style={{ minHeight: '60px' }}>
                                                    <div className="d-flex justify-content-center align-items-center">
                                                        <div
                                                            className="spinner-border text-primary"
                                                            role="status"
                                                            style={{ width: '1.5rem', height: '1.5rem' }}
                                                        >
                                                            <span className="visually-hidden">Loading...</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="card-body">
                                                    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '200px' }}>
                                                        <div className="text-center">
                                                            <div
                                                                className="spinner-border text-success mb-2"
                                                                role="status"
                                                                style={{ width: '2rem', height: '2rem' }}
                                                            >
                                                                <span className="visually-hidden">Loading...</span>
                                                            </div>
                                                            <div className="text-muted small">Đang tải...</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    // Hiển thị pet cards bình thường
                                    currentPets.map((pet, index) => (
                                        <div key={`${pet.id}-${index}`} className="col-lg-4 col-md-6 col-sm-12">
                                            <PetCard pet={pet} />
                                        </div>
                                    ))
                                )}
                            </div>

                            {/* Pagination với loading state */}
                            <div className="d-flex justify-content-center">
                                <Pagination
                                    currentPage={currentPage}
                                    totalPages={totalPages}
                                    onPageChange={handlePageChange}
                                    loading={paginationLoading}
                                />
                            </div>
                        </>
                    )}
                </div>
            </div>

            {/* Footer - Dùng Bootstrap classes */}
            <footer className="bg-white border-top mt-5">
                <div className="container" style={{ maxWidth: '1200px' }}>
                    <div className="py-4">
                        <div className="d-flex justify-content-between align-items-center flex-wrap">
                            <div className="d-flex gap-4">
                                <a href="#" className="text-muted text-decoration-none small">
                                    Tài nguyên
                                </a>
                                <a href="#" className="text-muted text-decoration-none small">
                                    Công ty
                                </a>
                            </div>
                            <div className="d-flex gap-3 align-items-center">
                                <a href="#" className="text-muted text-decoration-none fs-5">
                                    📘
                                </a>
                                <a href="#" className="text-muted text-decoration-none fs-5">
                                    🐦
                                </a>
                                <a href="#" className="text-muted text-decoration-none fs-5">
                                    💼
                                </a>
                            </div>
                        </div>
                        <div className="mt-3 d-flex align-items-center gap-2">
                            <small className="text-muted">Made with 💙 Visily</small>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default DogBreedsApp;