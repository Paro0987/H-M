import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "../Header/Header.css";
import { CiUser, CiHeart, CiBag1 } from "react-icons/ci";
import { FiSearch } from "react-icons/fi";
import SignInModal from '../SignInModal/SignInModal'; // Import the SignInModal component
import logo from "../../assets/H&M_logo.png";

const Header = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [activeDropdown, setActiveDropdown] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        console.log("Searching for:", searchTerm);
    };

    const handleDropdownToggle = (category) => {
        setActiveDropdown(activeDropdown === category ? null : category);
    };

    const handleSignInClick = () => {
        setIsModalOpen(true); // Open the modal when "Sign in" is clicked
    };

    const handleModalClose = () => {
        setIsModalOpen(false); // Close the modal
    };

    return (
        <header>
            <div className="top-bar">
                <div className="top-links">
                    <Link to="/customer-service">Customer Service</Link>
                    <Link to="/newsletter">Newsletter</Link>
                    <Link to="/find-store">Find a store</Link>
                </div>
                <div className="logo">
                    <img src={logo} alt="H&M Logo" />
                </div>
                <div className="user-links">
                    <button onClick={handleSignInClick} className="navbar__icon-button">
                        <CiUser className="navbar__icon" title="Account" /> Sign in
                    </button>
                    <Link to="/favourites"><CiHeart className="navbar__icon" title="Wishlist" /> Favourites</Link>
                    <Link to="/shopping-bag"><CiBag1 className="navbar__icon" title="Shopping Bag" /> Shopping bag (0)</Link>
                </div>
            </div>
            <nav className="main-nav">
                <div className="nav-item" onClick={() => handleDropdownToggle('ladies')}>
                    <a href="#">Ladies</a>
                    <div className={`dropdown-menu ${activeDropdown === 'ladies' ? 'visible' : ''}`}>
                    <Link to="/products/ladies">New Arrivals</Link>
                        <Link to="/products/ladies">Sale</Link>
                        <Link to="/products/ladies">Categories</Link>
                 </div>
                </div>
                <div className="nav-item" onClick={() => handleDropdownToggle('men')}>
                    <a href="#">Men</a>
                    <div className={`dropdown-menu ${activeDropdown === 'men' ? 'visible' : ''}`}>
                        <Link to="/products/men">New Arrivals</Link>
                        <Link to="/products/men">Sale</Link>
                        <Link to="/products/men">Categories</Link>
                    </div>
                </div>
                <div className="nav-item" onClick={() => handleDropdownToggle('baby')}>
                    <a href="#">Baby</a>
                    <div className={`dropdown-menu ${activeDropdown === 'baby' ? 'visible' : ''}`}>
                        <Link to="/baby/new-arrivals">New Arrivals</Link>
                        <Link to="/baby/sale">Sale</Link>
                        <Link to="/baby/categories">Categories</Link>
                    </div>
                </div>
                <div className="nav-item" onClick={() => handleDropdownToggle('kids')}>
                    <a href="#">Kids</a>
                    <div className={`dropdown-menu ${activeDropdown === 'kids' ? 'visible' : ''}`}>
                        <Link to="/kids/new-arrivals">New Arrivals</Link>
                        <Link to="/kids/sale">Sale</Link>
                        <Link to="/kids/categories">Categories</Link>
                    </div>
                </div>
                <div className="nav-item" onClick={() => handleDropdownToggle('home')}>
                    <a href="#">H&M HOME</a>
                    <div className={`dropdown-menu ${activeDropdown === 'home' ? 'visible' : ''}`}>
                        <Link to="/home/new-arrivals">New Arrivals</Link>
                        <Link to="/home/sale">Sale</Link>
                        <Link to="/home/categories">Categories</Link>
                    </div>
                </div>
                <div className="nav-item" onClick={() => handleDropdownToggle('sport')}>
                    <a href="#">Sport</a>
                    <div className={`dropdown-menu ${activeDropdown === 'sport' ? 'visible' : ''}`}>
                        <Link to="/sport/new-arrivals">New Arrivals</Link>
                        <Link to="/sport/sale">Sale</Link>
                        <Link to="/sport/categories">Categories</Link>
                    </div>
                </div>
                <a href="#">Sale</a>
                <a href="#">Sustainability</a>
                <div className="navbar__search-bar">
                    <form className="navbar__search" onSubmit={handleSearchSubmit}>
                        <FiSearch className="search-icon" />
                        <input
                            type="text"
                            placeholder="Search"
                            value={searchTerm}
                            onChange={handleSearchChange}
                        />
                        <button type="submit"></button>
                    </form>
                </div>
            </nav>
            <div className="sub-banner">
                <span>Free shipping above ₹1999</span>
                <span>Estimated delivery time: 2-7 days</span>
                <span>Free & flexible 15 days return</span>
            </div>

            {/* Include the SignInModal and pass props to control its visibility */}
            <SignInModal isOpen={isModalOpen} onClose={handleModalClose} />
        </header>
    );
};

export default Header;
