import { useState, useMemo, useCallback, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import 'react-datasheet-grid/dist/style.css'
import { Input } from 'reactstrap';
import { ApiGetAllDates } from "../../services/api";

const Sheets = () => {
    const [dates, setDates] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    
    useEffect(()=> {
        ApiGetAllDates()
            .then(res => res.json())
            .then(data => {
                setDates(data);
                setSearchResults(data);
            })
    }, [])

    const handleInputChange = event => {
        const input = event.target.value;        
        setSearchResults(
            dates.filter(date => date.includes(input))
        )    
    };

    return (
        <>
            <h1>Sheets</h1>
            
            <Input className="search-sheets" placeholder="filter by date" maxLength={10} onChange={handleInputChange}/>
            <ul>
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