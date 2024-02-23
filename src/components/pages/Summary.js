import checkValidation from "../../services/checkValidation";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";

const Summary = () => {
    const navigate = useNavigate();
    useEffect(() => {
        
        checkValidation(navigate);
    }, [])
    
    return (
        <>
            <h1>Summary</h1>
            <p>{jwtDecode(Cookies.get("token"))}</p>
        </>
    )
}

export default Summary;