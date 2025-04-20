import React, { useState } from "react"
import { useRouter } from 'next/router'
import CreateModal from './CreateModal'
import styles from '../styles/Navbar.module.css'

const BottomNavbar = () => {
    const router = useRouter();

    // State for controlling modal visibility
    const [showModal, setShowModal] = useState(false);

    const isHomeActive = router.pathname === '/';
    const isSearchActive = router.pathname === '/search';
    const isNotificationsActive = router.pathname === '/notifications';
    const isProfileActive = router.pathname === '/profile';

    // Toggle the modal visibility
    const handlePatchPlusClick = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
        <div className="row">
            <nav className={`${styles.navbarBg} navbar navbar-expand fixed-bottom`}>
                <div className="container-fluid justify-content-around">
                    <div className="col-sm-4"></div>
                    <div className="col-sm-1"><a
                        className={`nav-link ${isHomeActive ? 'text-primary' : 'text-white'}`}
                        href="/"
                    >
                        <i
                            className={`bi bi-house-door-fill ${isHomeActive ? 'text-primary' : 'text-white'}`}
                            style={{ fill: isHomeActive ? 'currentColor' : 'none' }}
                        ></i> 
                    </a></div>
                    <div className="col-sm-1"><a
                        className={`nav-link ${isSearchActive ? 'text-primary' : 'text-white'}`}
                        href="/search"
                    >
                        <i
                            className={`bi bi-search ${isSearchActive ? 'text-primary' : 'text-white'}`}
                            style={{ fill: isSearchActive ? 'currentColor' : 'none' }}
                        ></i>
                    </a></div>
                    <div className="col-sm-1">{/* Patch Plus Icon with click handler */}
                    <a
                        className="nav-link text-white"
                        onClick={handlePatchPlusClick}  // Show modal on click
                        href="#"
                    >
                        <i className="bi bi-patch-plus"></i>
                    </a></div>
                    <div className="col-sm-1"><a
                        className={`nav-link ${isNotificationsActive ? 'text-primary' : 'text-white'}`}
                        href="/notifications"
                    >
                        <i
                            className={`bi bi-bell ${isNotificationsActive ? 'text-primary' : 'text-white'}`}
                            style={{ fill: isNotificationsActive ? 'currentColor' : 'none' }}
                        ></i>
                    </a></div>
                    <div className="col-sm-1"><a
                        className={`nav-link ${isProfileActive ? 'text-primary' : 'text-white'}`}
                        href="/profile"
                    >
                        <i
                            className={`bi bi-person ${isProfileActive ? 'text-primary' : 'text-white'}`}
                            style={{ fill: isProfileActive ? 'currentColor' : 'none' }}
                        ></i>
                    </a></div>
                    <div className="col-sm-3"></div>
                    

                    

                    

                    

                    
                </div>
            </nav>

            {/* Modal Component */}
            <CreateModal showModal={showModal} handleCloseModal={handleCloseModal} />
        </div>
    );
};

export default BottomNavbar;