import React from 'react'
import { PetType } from '../../types/Pet'
import { Link } from 'react-router-dom'

const Pet = ({ pet, className }: { pet: PetType, className?: string }) => {

    const petImagePlaceholder = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1trw-Z4OaZ7SXgv4L7VU5MNG7qZgox5LRug&s";

    const isValidImageUrl = (url?: string): boolean => {
        if (!url) return false;
        // Simple regex to check for common image extensions at the end of URL (case insensitive)
        return /\.(jpeg|jpg|gif|png|webp|bmp|svg)$/i.test(url.trim());
    }

    return (
        <div className={`pet ${className}`} key={pet.id}>
            <div className="card h-100">
                <img
                    src={isValidImageUrl(pet?.photoUrls?.[0]) ? pet.photoUrls![0] : petImagePlaceholder}
                    className="card-img-top"
                    alt={pet.name}
                    style={{ objectFit: 'cover', height: '200px' }}
                />
                <div className="card-body d-flex flex-column">
                    <h6 className='card-subtitle mb-2'>{pet?.id}</h6>
                    <h5 className="card-title">{pet?.name}</h5>

                    <p className="card-text mb-1">
                        <strong>Category:</strong> {pet?.category?.name}
                    </p>

                    <p className="card-text mb-1">
                        <strong>Status:</strong>{' '}
                        <span
                            className={`status-badge ${pet.status === 'available'
                                ? 'status-available'
                                : pet.status === 'pending'
                                    ? 'status-pending'
                                    : 'status-sold'
                                }`}
                        >
                            {pet.status}
                        </span>
                    </p>

                    <p className="card-text mb-2">
                        <strong>Tags:</strong>{' '}
                        {pet.tags.length > 0
                            ? pet.tags.map((tag) => (
                                <span key={tag.id} className="badge bg-secondary me-1">
                                    {tag.name}
                                </span>
                            ))
                            : 'No tags'}
                    </p>

                    <div className="mt-auto">
                        <Link to="#" className="btn btn-primary w-100">
                            View Details
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Pet
