import Cookies from "js-cookie";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom"
import checkValidation from "../../../services/checkValidation";

const Logout =() => {
    const navigate = useNavigate();

    useEffect(() => {
        if (!checkValidation(navigate)) return;
        navigate('/login?signedout=true');
    }, [])

    return (
        <>
            <p>Signing you out now...</p>
        </>
    );
}

export default Logout;