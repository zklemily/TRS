import React, {useEffect, useState} from "react";
import { useLocation } from "react-router-dom";

const ShowNavbar = ({children}) => {
    const location = useLocation();

    const [showNavbar, setShowNavbar] = useState(true);

    useEffect(() => {
        if (location.pathname === '/' || location.pathname === '/sign-up' || location.pathname === '/reset-password' 
        || location.pathname === '/send-reset-link' || location.pathname === '/activate') {
            setShowNavbar(true);
        } else {
            setShowNavbar(false);
        }
    }, [location])

    return (
        <div>{showNavbar && children}</div>
    )
}

export default ShowNavbar;