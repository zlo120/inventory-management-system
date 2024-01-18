import DateSheet from '../sheet/DateSheet';
import { Link, useSearchParams } from "react-router-dom";

const StockIntake = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    let date = searchParams.get("date");
    
    if (date === "undefined" || date === null) 
        return (<p>An error has an occured, there should be an associated date with this url path.</p>)
    return (
        <DateSheet dateString={String(date)} />
    )
}

export default StockIntake;