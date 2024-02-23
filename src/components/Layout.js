import { useEffect } from 'react';
import { Outlet, Link, useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import CustomSideNav from './nav/Nav';
import Cookies from "js-cookie";

const Layout = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (
            (location.pathname === "/" || location.pathname === "/login" || location.pathname === "/register") 
            && (Cookies.get('bearer') !== undefined)
        ) {
                navigate('/inventory')
        }
    }, [])

    // if the user is at /, /login or /register and they DO have a token
    if (
        (location.pathname === "/" || location.pathname === "/login" || location.pathname === "/register") 
        && (Cookies.get('bearer') !== undefined)
        && (searchParams.get("signedout") === "true")
    ) {
        // if use has just been signed out
        return (
            <Outlet />
        )
    }
    else if ((location.pathname === "/" || location.pathname === "/login" || location.pathname === "/register") 
            && (Cookies.get('bearer') === undefined)) {
        // if user is at /, /login or /register and they DON'T have a token
        return (
            <Outlet />
        )
    }

    return (
        <div style={{ display: 'flex', height: '100%', minHeight: '400px', width: '100%', minWidth: "100%" }}>
          <CustomSideNav />
          <main style={{ padding: 10, minWidth: "85vw" }}><Outlet /></main>
        </div>
    )
}

export default Layout;