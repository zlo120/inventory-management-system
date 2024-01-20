import DateSheet from '../sheet/DateSheet';
import { Link, useSearchParams } from "react-router-dom";
import MasterSheet from '../sheet/MasterSheet';

const StockIntake = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const date = searchParams.get("date");
    const master = searchParams.get("master");

    if (master === "true") return (<MasterSheet />)
    
    if (date === "undefined" || date === null) 
        return (<p>An error has an occured, there should be an associated date with this url path.</p>)
    return (
        <DateSheet dateString={String(date)} />
    )
}

export default StockIntake;