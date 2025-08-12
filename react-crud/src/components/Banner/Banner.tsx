import React from 'react'
import "./Banner.scss"; // Assuming you have a Banner.scss for styles
type BannerProps = {
    brand?: string;
    title?: string;
    subtitle?: string;
    imageUrl?: string;
    classname?: string;
}

const Banner = ({ brand, title, subtitle, imageUrl, classname }: BannerProps) => {
    return (
        <div className={`banner container d-flex justify-content-between align-items-center ${classname}`}>
            <div style={{ backgroundImage: `url(${imageUrl})` }} className='banner-bg-image d-flex flex-column gap-3'>
                <div className='banner-content'>
                    <h4 className='text-warning'>{brand}</h4>
                    <h1 className='text-white'>{title}</h1>
                    <h6 className='text-white'>{subtitle}</h6>
                </div>
            </div>
        </div>
    )
}

export default Banner