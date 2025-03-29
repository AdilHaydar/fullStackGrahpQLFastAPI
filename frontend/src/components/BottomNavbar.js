import React, { useState } from "react";
import { useRouter } from 'next/router';
import CreateModal from './CreateModal';

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
        <div>
            <nav className="navbar navbar-expand navbar-dark bg-dark fixed-bottom">
                <div className="container-fluid justify-content-around">
                    <a
                        className={`nav-link ${isHomeActive ? 'text-primary' : 'text-white'}`}
                        href="/"
                    >
                        <i
                            className={`bi bi-house-door-fill ${isHomeActive ? 'text-primary' : 'text-white'}`}
                            style={{ fill: isHomeActive ? 'currentColor' : 'none' }}
                        ></i> 
                    </a>

                    <a
                        className={`nav-link ${isSearchActive ? 'text-primary' : 'text-white'}`}
                        href="/search"
                    >
                        <i
                            className={`bi bi-search ${isSearchActive ? 'text-primary' : 'text-white'}`}
                            style={{ fill: isSearchActive ? 'currentColor' : 'none' }}
                        ></i>
                    </a>

                    {/* Patch Plus Icon with click handler */}
                    <a
                        className="nav-link text-white"
                        onClick={handlePatchPlusClick}  // Show modal on click
                    >
                        <i className="bi bi-patch-plus"></i>
                    </a>

                    <a
                        className={`nav-link ${isNotificationsActive ? 'text-primary' : 'text-white'}`}
                        href="/notifications"
                    >
                        <i
                            className={`bi bi-bell ${isNotificationsActive ? 'text-primary' : 'text-white'}`}
                            style={{ fill: isNotificationsActive ? 'currentColor' : 'none' }}
                        ></i>
                    </a>

                    <a
                        className={`nav-link ${isProfileActive ? 'text-primary' : 'text-white'}`}
                        href="/profile"
                    >
                        <i
                            className={`bi bi-person ${isProfileActive ? 'text-primary' : 'text-white'}`}
                            style={{ fill: isProfileActive ? 'currentColor' : 'none' }}
                        ></i>
                    </a>
                </div>
            </nav>

            {/* Modal Component */}
            <CreateModal showModal={showModal} handleCloseModal={handleCloseModal} />
        </div>
    );
};

export default BottomNavbar;