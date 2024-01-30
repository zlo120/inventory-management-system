import { useState, useMemo, useCallback, useEffect } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import 'react-datasheet-grid/dist/style.css'
import { Input } from 'reactstrap';
import { ApiGetAllDates } from "../../services/api";
import checkValidation from "../../services/checkValidation";

const Sheets = () => {
    const navigate = useNavigate();
    const [dates, setDates] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    
    const handleInputChange = event => {
        const input = event.target.value;        
        setSearchResults(
            dates.filter(date => date.includes(input))
        )    
    };

    useEffect(()=> {
        if (!checkValidation(navigate)) {
            return;
        }

        ApiGetAllDates()
            .then(res => res.json())
            .then(data => {
                setDates(data);
                setSearchResults(data);
            })
    }, [])

    return (
        <>
            <h1>Sheets</h1>
            
            <Input className="search-sheets" placeholder="filter by date" maxLength={10} onChange={handleInputChange}/>
            <ul>
                <li><Link to={{ pathname: '/stockintake', search: `?master=true` }}>Master Sheet</Link></li>
                {
                    searchResults
                        .map(date => (
                            <li><Link to={{ pathname: '/stockintake', search: `?date=${date}` }}>{date}</Link></li>
                        ))
                }
            </ul>
        </>
    )
}

export default Sheets;