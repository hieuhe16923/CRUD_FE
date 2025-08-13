import React, { useState, useEffect } from 'react';
import type { Pet, Status, ItemsPerPage } from '../types';
import { useOnlineStatus } from '../hooks/useOnlineStatus';
import { petService } from '../services/petService';
import { LoadingSpinner, LoadingBar } from '../components/common/Loading';
import { ErrorAlert, OfflineAlert } from '../components/common/Alerts';
import { PetCard } from '../components/cards/PetCard';
import { Pagination } from '../components/pagination/Pagination';
import { Header } from '../components/layout/Header';
import Footer from "../components/layout/Footer.tsx";

const DogBreedsApp: React.FC = () => {
    const [pets, setPets] = useState<Pet[]>([]);
    const [filteredPets, setFilteredPets] = useState<Pet[]>([]);
    const [currentStatus, setCurrentStatus] = useState<Status>('available');
    const [loading, setLoading] = useState(false);
    const [paginationLoading, setPaginationLoading] = useState(false); // Thêm loading riêng cho pagination
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState<ItemsPerPage>(6); // State quản lý items per page thể hiện mặc định có mấy petcard hiển thị
    const isOnline = useOnlineStatus();

    // Đây là nơi itemsPerPage ảnh hưởng đến hiển thị
    const totalPages = Math.ceil(filteredPets.length / itemsPerPage); // Tính tổng số trang
    const startIndex = (currentPage - 1) * itemsPerPage;            // Vị trí bắt đầu
    const endIndex = startIndex + itemsPerPage;                     // Vị trí kết thúc
    const currentPets = filteredPets.slice(startIndex, endIndex);   // Cắt mảng pets

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
        setItemsPerPage(items); // Cập nhật state
        setCurrentPage(1); // Reset về trang 1
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