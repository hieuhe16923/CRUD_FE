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

    const statusColors: Record<Status, string> = {
        available: 'success',
        pending: 'warning',
        sold: 'danger'
    };

    const statusLabels: Record<Status, string> = {
        available: 'Có sẵn',
        pending: 'Đang chờ',
        sold: 'Đã bán'
    };

    // Xử lý status mặc định nếu thiếu
    const displayStatus: Status = pet.status || 'sold';

    return (
        <div className="card h-100 shadow-sm" style={{ transition: 'transform 0.2s' }}
             onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
             onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>

            {/* Header với ID và menu */}
            <div className="card-header bg-white d-flex justify-content-between align-items-center border-bottom">
                <small className="text-muted fw-medium">{String(pet.id)}</small>
                <span className="text-muted" style={{ cursor: 'pointer' }}>•••</span>
            </div>

            {/* Pet Info Section - theo figma: ảnh tròn và text cạnh nhau */}
            <div className="card-body">
                <div className="d-flex align-items-center mb-3">
                    {/* Circular pet image - theo figma */}
                    <div className="rounded-circle overflow-hidden me-3 border"
                         style={{
                             width: '60px',
                             height: '60px',
                             minWidth: '60px',
                             flexShrink: 0
                         }}>
                        <img
                            src={getCategoryImage(pet.category?.name)}
                            alt={pet.name || 'Pet'}
                            className="w-100 h-100"
                            style={{ objectFit: 'cover' }}
                        />
                    </div>

                    {/* Pet name và category cạnh ảnh - theo figma */}
                    <div className="flex-grow-1">
                        <h5 className="card-title mb-1 fw-semibold" style={{ fontSize: '1.1rem' }}>
                            {pet.name || 'Không có tên'}
                        </h5>
                        <small className="text-muted" style={{ fontSize: '0.875rem' }}>
                            {pet.category?.name || 'Không rõ loại'}
                        </small>
                    </div>
                </div>

                {/* Tags section */}
                {pet.tags && pet.tags.length > 0 && (
                    <div className="mb-3">
                        <small className="text-muted d-block mb-2">Thẻ:</small>
                        <div className="d-flex flex-wrap gap-1">
                            {pet.tags.slice(0, 3).map((tag, index) => (
                                <span
                                    key={index}
                                    className="badge bg-light text-success border"
                                    style={{ fontSize: '0.7em' }}
                                >
                                    {tag.name || 'Không rõ tag'}
                                </span>
                            ))}
                            {pet.tags.length > 3 && (
                                <span className="badge bg-light text-success border" style={{ fontSize: '0.7em' }}>
                                    +{pet.tags.length - 3}
                                </span>
                            )}
                        </div>
                    </div>
                )}

                {/* Status - đặt ở cuối */}
                <div className="mt-auto">
                    <small className="text-muted d-block mb-2">Trạng thái:</small>
                    <span className={`badge bg-${statusColors[displayStatus]} text-white`}>
                        {statusLabels[displayStatus]}
                    </span>
                </div>
            </div>
        </div>
    );
};