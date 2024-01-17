import { Outlet, Link, useNavigate } from 'react-router-dom'
import CustomSideNav from './nav/Nav'

const Layout = () => {
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