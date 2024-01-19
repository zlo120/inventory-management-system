import Cookies from "js-cookie";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom"

const Logout =() => {
    const navigate = useNavigate();

    useEffect(() => {
        navigate('/login?signedout=true')
        Cookies.remove('token');
    }, [])

    return (
        <>
            <p>Signing you out now...</p>
        </>
    );
}

export default Logout;