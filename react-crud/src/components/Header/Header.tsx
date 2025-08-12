import React from 'react'
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaHeart, FaShoppingCart } from "react-icons/fa";
import ReactIcon from "../ReactIcon/ReactIcon"; // Import the wrapper we created
import { Link } from 'react-router-dom';
import "./Header.scss"; // Assuming you have a Header.scss for styles
const Header = () => {
    return (
        <div className='header'>
            <div className="container py-1 border-bottom small">
                <div className="d-flex justify-content-between align-items-center">
                    <div>
                        <ReactIcon IconComponent={FaPhone} className="me-2" /> +379 871-8371
                        <ReactIcon IconComponent={FaEnvelope} className="ms-3 me-2" /> rganton@outlook.com
                    </div>
                    <div>
                        <ReactIcon IconComponent={FaMapMarkerAlt} className="me-2" /> 6592 Fairground St. Tallahassee, FL 32303
                    </div>
                </div>
            </div>
            <nav className="container navbar navbar-expand-lg bg-white p-3 my-2 shadow-sm rounded-pill">
                <div className="container">
                    <Link className="navbar-brand d-flex align-items-center gap-2" to="/">
                        <svg width="30" height="24" viewBox="0 0 30 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7.65257 23.3199C6.69205 23.7512 4.83435 24.4373 3.8858 23.6155C3.22658 23.0443 3.26325 21.6041 3.31014 20.817C3.45904 18.325 4.87551 15.8672 6.37304 13.9357C8.16338 11.627 10.8429 9.86535 13.7629 9.76683C15.9795 9.69201 18.1632 10.5817 19.8939 11.9685C21.6247 13.3553 22.9324 15.212 23.9368 17.1891C24.4269 18.1539 24.8577 19.1852 24.8741 20.2672C24.8903 21.3492 24.412 22.4966 23.4609 23.0126C22.6984 23.4264 21.7566 23.3778 20.9315 23.1096C20.1064 22.8418 19.3629 22.3753 18.5989 21.964C17.1897 21.2056 15.6261 20.6149 14.0288 20.7119C11.7194 20.8526 9.76343 22.3721 7.65257 23.3199Z" fill="black" />
                            <path d="M5.46221 11.1432C5.74581 13.4805 3.97017 14.7521 2.15663 12.9949C1.04446 11.9174 0.178717 10.0006 0.0235771 8.45941C-0.0544918 7.68271 0.0405378 6.80499 0.62618 6.28894C1.18738 5.79434 2.06484 5.79159 2.73454 6.12507C3.40424 6.45855 3.89535 7.06788 4.2812 7.7089C4.90999 8.75372 5.3153 9.93249 5.46221 11.1432Z" fill="black" />
                            <path d="M12.1667 4.8491C12.5403 6.4222 12.0966 8.85008 9.9713 8.67149C7.4272 8.45774 7.13164 4.06766 7.40675 2.25861C7.50976 1.58018 7.7734 0.82269 8.41316 0.574765C8.85364 0.403911 9.3667 0.535107 9.75555 0.803734C10.1442 1.07211 10.431 1.46146 10.6986 1.85081C11.3319 2.77342 11.9081 3.76013 12.1667 4.8491Z" fill="black" />
                            <path d="M21.0137 3.82031C21.0367 2.77798 20.8042 1.68377 20.1198 0.897339C19.4354 0.110913 18.2257 -0.268956 17.3018 0.214173C16.3428 0.715511 15.9899 1.89877 15.8317 2.96904C15.6167 4.42241 15.2698 7.09322 16.3313 8.31763C16.9958 9.0841 17.9922 8.68528 18.7542 8.24255C20.249 7.37357 20.9776 5.47647 21.0137 3.82031Z" fill="black" />
                            <path d="M27.274 13.3564C25.7773 14.7681 22.7178 14.3306 22.988 11.8955C23.1705 10.2483 24.2917 8.55126 25.3078 7.28744C25.9277 6.51672 26.8345 5.77245 27.8001 5.9872C28.5658 6.15756 29.0926 6.9133 29.2265 7.68626C29.3602 8.45922 29.1774 9.24939 28.9696 10.0059C28.6336 11.2285 28.1966 12.4864 27.274 13.3564Z" fill="black" />
                        </svg>

                        <span>Pet Shop</span>
                    </Link>

                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#main-nav"
                        aria-controls="main-nav"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="main-nav">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link fw-bold border-bottom border-warning border-2 text-warning" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/shop">Shop</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/about-us">About Us</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/contact">Contact Us</Link>
                            </li>
                        </ul>

                        <form className="d-flex me-3" role="search">
                            <input
                                className="form-control me-2"
                                type="search"
                                placeholder="Search products..."
                                aria-label="Search"
                            />
                            <button className="btn btn-outline-secondary" type="submit">
                                Search
                            </button>
                        </form>

                        <ReactIcon IconComponent={FaHeart} className="me-3" />
                        <ReactIcon IconComponent={FaShoppingCart} />
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Header