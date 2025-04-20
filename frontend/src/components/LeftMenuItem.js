import { useState, useEffect } from "react";
import { useRouter } from 'next/router'


const LeftMenuItem = ({ cssClass, name, route, icon }) => {
    const router = useRouter();
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        const currentPath = window.location.pathname;
        setIsActive(currentPath === route);
    }, [route]);

    return (
        <div>

        
        <div className={cssClass} onClick={() => router.push(route)}>
            <div className={`${isActive ? 'text-primary' : 'text-white'}`}
            href="/">
                <i className={`${icon} ${isActive ? 'text-primary' : 'text-white'}`}
                    style={{ fill: isActive ? 'currentColor' : 'none' }}></i>
            </div>
            <div className="m-lg-2">{name}</div>
            
        </div>
        <hr></hr>
        </div>
    );
};

export default LeftMenuItem;
