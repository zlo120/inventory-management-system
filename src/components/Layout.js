import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom'
import CustomSideNav from './nav/Nav'

const Layout = () => {
    const location = useLocation();

    if (location.pathname === "/login" || location.pathname === "/register") {
        return (
            <Outlet />
        )
    }


    return (
        <div className='main-layout'>
            <div className='custom-side-nav'>
                <CustomSideNav />
            </div>
            <div className='outlet'>
                <Outlet />
            </div>
        </div>
    )
}

export default Layout;