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
        <div style={{ display: 'flex', height: '100%', minHeight: '400px', width: '100%', minWidth: "100%" }}>
          <CustomSideNav />
          <main style={{ padding: 10, minWidth: "85vw" }}><Outlet /></main>
        </div>
    )
}

export default Layout;