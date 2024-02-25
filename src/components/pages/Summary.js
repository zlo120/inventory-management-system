import checkValidation from "../../services/checkValidation";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";

const Summary = () => {
    const [decodedToken, setDecodedToken] = useState({});
    const navigate = useNavigate();
    const token = Cookies.get("bearer");
    
    useEffect(() => {        
        setDecodedToken(jwtDecode(token));
        checkValidation(navigate);
    }, [])
    
    return (
        <>
            <h1>Summary</h1>
            <p>{token}</p>
            <ul>
                <li>ID: {String(decodedToken.id)}</li>
                <li>type: {String(decodedToken.type)}</li>
                <li>group_id: {String(decodedToken.group_id)}</li>
            </ul>
        </>
    )
}

export default Summary;