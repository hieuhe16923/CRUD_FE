import React, { useState, useEffect } from 'react';
import type { Pet, Status, ItemsPerPage } from '../types';
import { useOnlineStatus } from '../hooks/useOnlineStatus';
import { petService } from '../services/petService';
import { LoadingSpinner, LoadingBar } from '../components/common/Loading';
import { ErrorAlert, OfflineAlert } from '../components/common/Alerts';
// import { StatusFilter } from '../components/filters/StatusFilter';
import { PetCard } from '../components/cards/PetCard';
import { Pagination } from '../components/pagination/Pagination';
import { Header } from '../components/layout/Header';

const DogBreedsApp: React.FC = () => {
    const [pets, setPets] = useState<Pet[]>([]);
    const [filteredPets, setFilteredPets] = useState<Pet[]>([]);
    const [currentStatus, setCurrentStatus] = useState<Status>('available');
    const [loading, setLoading] = useState(false);
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

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        // window.scrollTo({ top: 0, behavior: 'smooth' });
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
        <div style={{
            minHeight: '100vh',
            backgroundColor: '#f8f9fa',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
        }}>
            {loading && <LoadingBar />}

            {/* Header mới */}
            <Header
                isOnline={isOnline}
                currentStatus={currentStatus}
                onStatusChange={handleStatusChange}
                loading={loading}
                itemsPerPage={itemsPerPage}
                onItemsPerPageChange={handleItemsPerPageChange}
                totalItems={filteredPets.length}
            />


            {/* Main Content */}
            <div style={{
                maxWidth: '1200px',
                margin: '0 auto',
                padding: '24px 20px'
            }}>
                {!isOnline && <OfflineAlert />}

                {error && (
                    <ErrorAlert
                        message={error}
                        onRetry={isOnline ? handleRetry : undefined}
                    />
                )}

                {loading && <LoadingSpinner />}

                {!loading && !error && filteredPets.length === 0 && (
                    <div style={{
                        textAlign: 'center',
                        padding: '60px 0',
                        color: '#666'
                    }}>
                        <div style={{ fontSize: '48px', marginBottom: '16px' }}>🐾</div>
                        <h4 style={{ marginBottom: '8px', color: '#333' }}>Không có dữ liệu</h4>
                        <p>Không tìm thấy động vật nào với trạng thái này.</p>
                    </div>
                )}

                {!loading && !error && currentPets.length > 0 && (
                    <>
                        {/* Pet Grid với style mới */}
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 340px))',
                            justifyContent: 'center',
                            gap: '24px',
                            marginBottom: '32px'
                        }}>
                            {currentPets.map((pet, index) => (
                                <PetCard key={`${pet.id}-${index}`} pet={pet} />
                            ))}
                        </div>

                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={handlePageChange}
                        />
                    </>
                )}
            </div>

            {/* Footer mới */}
            <footer style={{
                backgroundColor: 'white',
                borderTop: '1px solid #e0e0e0',
                padding: '24px 0',
                marginTop: '48px'
            }}>
                <div style={{
                    maxWidth: '1200px',
                    margin: '0 auto',
                    padding: '0 20px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: '16px'
                }}>
                    <div style={{ display: 'flex', gap: '24px' }}>
                        <a href="#" style={{
                            color: '#666',
                            textDecoration: 'none',
                            fontSize: '14px'
                        }}>
                            Tài nguyên
                        </a>
                        <a href="#" style={{
                            color: '#666',
                            textDecoration: 'none',
                            fontSize: '14px'
                        }}>
                            Công ty
                        </a>
                    </div>
                    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                        <a href="#" style={{
                            color: '#666',
                            fontSize: '20px',
                            textDecoration: 'none'
                        }}>
                            📘
                        </a>
                        <a href="#" style={{
                            color: '#666',
                            fontSize: '20px',
                            textDecoration: 'none'
                        }}>
                            🐦
                        </a>
                        <a href="#" style={{
                            color: '#666',
                            fontSize: '20px',
                            textDecoration: 'none'
                        }}>
                            💼
                        </a>
                    </div>
                </div>
                <div style={{
                    maxWidth: '1200px',
                    margin: '16px auto 0',
                    padding: '0 20px',
                    fontSize: '12px',
                    color: '#999',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                }}>
                    Made with 💙 Visily
                </div>
            </footer>
        </div>
    );
};

export default DogBreedsApp;