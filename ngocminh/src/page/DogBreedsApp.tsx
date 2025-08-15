import React, { useState, useEffect, useCallback } from 'react';
import type { PetDto, PetStatus, ItemsPerPage, FilterStateDto } from '../types';
import { useOnlineStatus } from '../hooks/useOnlineStatus';
import { petService } from '../services/petService';
import { LoadingSpinner, LoadingBar } from '../components/Loading.tsx';
import { ErrorAlert, OfflineAlert } from '../components/Alerts.tsx';
import { PetCard } from '../components/PetCard.tsx';
import { Pagination } from '../components/Pagination.tsx';
import { Header } from '../components/Header.tsx';
import Footer from "../components/Footer.tsx";

const DogBreedsApp: React.FC = () => {
    const [pets, setPets] = useState<PetDto[]>([]);
    const [filteredPets, setFilteredPets] = useState<PetDto[]>([]);
    const [loading, setLoading] = useState(false);
    const [paginationLoading, setPaginationLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const isOnline = useOnlineStatus();

    // Sử dụng FilterStateDto để quản lý tất cả filter state
    const [filterState, setFilterState] = useState<FilterStateDto>({
        status: 'available',
        currentPage: 1,
        itemsPerPage: 6
    });

    // Destructure để dễ sử dụng
    const { status: currentStatus, currentPage, itemsPerPage } = filterState;

    // Đây là nơi itemsPerPage ảnh hưởng đến hiển thị
    const totalPages = Math.ceil(filteredPets.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentPets = filteredPets.slice(startIndex, endIndex);

    // Sử dụng useCallback để tránh dependency warning
    const fetchPets = useCallback(async (status: PetStatus, signal: AbortSignal) => {
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
                // Reset về trang 1 khi fetch dữ liệu mới
                setFilterState(prev => ({ ...prev, currentPage: 1 }));
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
    }, [isOnline]);

    useEffect(() => {
        const controller = new AbortController();
        fetchPets(currentStatus, controller.signal);
        return () => {
            controller.abort();
        };
    }, [currentStatus, fetchPets]);

    // Debug filteredPets mỗi khi thay đổi
    useEffect(() => {
        console.log(`filteredPets hiện tại: ${filteredPets.length} pet`, filteredPets);
    }, [filteredPets]);

    useEffect(() => {
        setFilteredPets(pets); // Giữ nguyên tất cả pet
    }, [pets]);

    const handleStatusChange = (status: PetStatus) => {
        setFilterState(prev => ({
            ...prev,
            status,
            currentPage: 1 // Reset về trang 1 khi thay đổi status
        }));
    };

    const handlePageChange = async (page: number) => {
        if (paginationLoading) return; // Ngăn chặn multiple clicks

        setPaginationLoading(true);

        // Tăng loading delay từ 300ms lên 500ms để thấy rõ hơn
        await new Promise(resolve => setTimeout(resolve, 500));

        setFilterState(prev => ({ ...prev, currentPage: page }));
        setPaginationLoading(false);

        // Scroll to top với animation mượt
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleItemsPerPageChange = (items: ItemsPerPage) => {
        setFilterState(prev => ({
            ...prev,
            itemsPerPage: items,
            currentPage: 1 // Reset về trang 1 khi thay đổi items per page
        }));
    };

    const handleRetry = () => {
        const controller = new AbortController();
        fetchPets(currentStatus, controller.signal);
    };

    return (
        <div className="" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <div style={{ flex: '1 0 auto' }}>
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
                                        <div className="d-flex justify-content-center py-5 w-100">
                                            <LoadingSpinner />
                                        </div>
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
            </div>
            {/* Footer - Dùng Bootstrap classes */}
            <Footer />
        </div>
    );
};

export default DogBreedsApp;