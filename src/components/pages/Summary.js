import checkValidation from "../../services/checkValidation";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Summary = () => {
    const navigate = useNavigate();
    useEffect(() => {
        
        checkValidation(navigate);
    }, [])
    
    return (
        <h1>Summary</h1>
    )
}

export default Summary;