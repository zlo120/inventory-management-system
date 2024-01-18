import { useState, useMemo, useCallback, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import 'react-datasheet-grid/dist/style.css'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { ApiGetAllDates } from "../../services/api";

const Sheets = () => {
    const [dates, setDates] = useState([]);

    useEffect(()=> {
        ApiGetAllDates()
            .then(res => res.json())
            .then(data => {
                setDates(data);
            })
    }, [])


    return (
        <>
            <h1>Sheets</h1>
            <ul>
                {
                    dates.map(date => (
                        <li><Link to={{ pathname: '/stockintake', search: `?date=${date}` }}>{date}</Link></li>
                    ))
                }
            </ul>
        </>
    )
}

export default Sheets;