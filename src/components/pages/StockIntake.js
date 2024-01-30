import DateSheet from '../pages/sheet/DateSheet';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link, useSearchParams } from "react-router-dom";
import MasterSheet from '../pages/sheet/MasterSheet';
import checkValidation from '../../services/checkValidation';

const StockIntake = () => {
    // hooks
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();    
    const date = searchParams.get("date");
    const master = searchParams.get("master");

    useEffect(() => {
        checkValidation(navigate);
    }, [])

    // renders
    if (master === "true") return (<MasterSheet />)
    
    if (date === "undefined" || date === null) 
        return (<p>An error has an occured, there should be an associated date with this url path.</p>)
    return (
        <DateSheet dateString={String(date)} />
    )
}

export default StockIntake;