import React from 'react';
import type { Pet, Status } from '../../types';

interface PetCardProps {
    pet: Pet;
}

export const PetCard: React.FC<PetCardProps> = ({ pet }) => {
    const getCategoryImage = (categoryName?: string): string => {
        const defaultImage = "https://m.media-amazon.com/images/I/61E7E12FtBL._UF894,1000_QL80_.jpg";

        if (!categoryName) return defaultImage;

        const category = categoryName.toLowerCase();
        if (category.includes('dog')) return 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQpflckqTzo_CVJxHUPahKCrnIL3d2DIJn1ThfaalZfK682pUAn3mFidzfZM_yuLhNwHlLHRd_UkAVb_KZQfj4pnA';
        if (category.includes('cat')) return 'https://images.squarespace-cdn.com/content/v1/607f89e638219e13eee71b1e/1684821560422-SD5V37BAG28BURTLIXUQ/michael-sum-LEpfefQf4rU-unsplash.jpg';
        if (category.includes('bird')) return 'https://cdn.britannica.com/10/250610-050-BC5CCDAF/Zebra-finch-Taeniopygia-guttata-bird.jpg';
        if (category.includes('fish')) return 'https://images.pexels.com/photos/128756/pexels-photo-128756.jpeg?cs=srgb&dl=pexels-crisdip-35358-128756.jpg&fm=jpg';
        if (category.includes('rabbit')) return 'https://upload.wikimedia.org/wikipedia/commons/1/1f/Oryctolagus_cuniculus_Rcdo.jpg';
        if (category.includes('guinea')) return 'https://img.lb.wbmdstatic.com/vim/live/webmd/consumer_assets/site_images/article_thumbnails/BigBead/what_to_know_about_house_mice_bigbead.jpg';

        return defaultImage;
    };

    const getAnimalEmoji = (categoryName?: string): string => {
        if (!categoryName) return '🐾';
        const category = categoryName.toLowerCase();
        if (category.includes('dog')) return '🐕';
        if (category.includes('cat')) return '🐱';
        if (category.includes('bird')) return '🐦';
        if (category.includes('fish')) return '🐟';
        if (category.includes('rabbit')) return '🐰';
        if (category.includes('guinea')) return '🐹';
        return '🐾';
    };

    const statusColors: Record<Status, string> = {
        available: '#28a745',
        pending: '#ffc107',
        sold: '#dc3545'
    };

    const statusLabels: Record<Status, string> = {
        available: 'Có sẵn',
        pending: 'Đang chờ',
        sold: 'Đã bán'
    };

    // Xử lý status mặc định nếu thiếu
    const displayStatus: Status = pet.status || 'sold';

    return (
        <div
            style={{
                border: '1px solid #e0e0e0',
                borderRadius: '12px',
                overflow: 'hidden',
                backgroundColor: 'white',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                transition: 'transform 0.2s, box-shadow 0.2s',
                cursor: 'pointer',
                height: '100%',
                display: 'flex',
                flexDirection: 'column'
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
            }}
        >
            {/* Header với ID và menu */}
            <div style={{
                padding: '12px 16px',
                borderBottom: '1px solid #f0f0f0',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <span style={{
                    color: '#666',
                    fontSize: '12px',
                    fontWeight: '500'
                }}>
                    {String(pet.id)}
                </span>
                <span style={{
                    color: '#666',
                    fontSize: '16px',
                    cursor: 'pointer'
                }}>
                    •••
                </span>
            </div>

            {/* Pet Image với icon */}
            <div style={{
                position: 'relative',
                height: '180px',
                overflow: 'hidden'
            }}>
                <img
                    src={getCategoryImage(pet.category?.name)}
                    alt={pet.name || 'Pet'}
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                    }}
                />

                <div style={{
                    position: 'absolute',
                    top: '12px',
                    left: '12px',
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    borderRadius: '50%',
                    width: '40px',
                    height: '40px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '20px'
                }}>
                    {getAnimalEmoji(pet.category?.name)}
                </div>
            </div>

            {/* Pet Info */}
            <div style={{
                padding: '16px',
                flex: 1,
                display: 'flex',
                flexDirection: 'column'
            }}>
                {/* Tên và loại */}
                <h3 style={{
                    margin: '0 0 4px 0',
                    fontSize: '18px',
                    fontWeight: '600',
                    color: '#333'
                }}>
                    {pet.name || 'Không có tên'}
                </h3>

                <p style={{
                    margin: '0 0 12px 0',
                    fontSize: '14px',
                    color: '#666'
                }}>
                    {pet.category?.name || 'Không rõ loại'}
                </p>

                {/* Tags */}
                {pet.tags && pet.tags.length > 0 && (
                    <div style={{ marginBottom: '12px' }}>
                        <div style={{
                            fontSize: '12px',
                            color: '#666',
                            marginBottom: '6px'
                        }}>
                            Thẻ:
                        </div>
                        <div style={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            gap: '4px'
                        }}>
                            {pet.tags.slice(0, 3).map((tag, index) => (
                                <span
                                    key={index}
                                    style={{
                                        backgroundColor: '#f0f8f0',
                                        color: '#2d5a2d',
                                        padding: '2px 8px',
                                        borderRadius: '12px',
                                        fontSize: '11px',
                                        fontWeight: '500'
                                    }}
                                >
                                    {tag.name || 'Không rõ tag'}
                                </span>
                            ))}
                            {pet.tags.length > 3 && (
                                <span style={{
                                    backgroundColor: '#f0f8f0',
                                    color: '#2d5a2d',
                                    padding: '2px 8px',
                                    borderRadius: '12px',
                                    fontSize: '11px',
                                    fontWeight: '500'
                                }}>
                                    +{pet.tags.length - 3}
                                </span>
                            )}
                        </div>
                    </div>
                )}

                {/* Status - đặt ở cuối */}
                <div style={{ marginTop: 'auto' }}>
                    <div style={{
                        fontSize: '12px',
                        color: '#666',
                        marginBottom: '6px'
                    }}>
                        Trạng thái:
                    </div>
                    <span style={{
                        backgroundColor: statusColors[displayStatus],
                        color: 'white',
                        padding: '4px 10px',
                        borderRadius: '12px',
                        fontSize: '11px',
                        fontWeight: '500',
                        display: 'inline-block'
                    }}>
                        {statusLabels[displayStatus]}
                    </span>
                </div>
            </div>
        </div>
    );
};