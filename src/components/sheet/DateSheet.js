import { useEffect, useState, useMemo, useCallback } from "react";
import { ApiGetInventoryByDate } from "../../services/api";
import { Blocks } from 'react-loader-spinner';
import { Button } from 'reactstrap';
import { DynamicDataSheetGrid, textColumn, keyColumn, dateColumn, intColumn, checkboxColumn } from "react-datasheet-grid";
import 'react-datasheet-grid/dist/style.css'
import ExcelExport from "../../services/excelexport";

const DateSheet = ({dateString}) => {
    const [date, setDate] = useState(null);
    const [validDate, setValidDate] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState([]);
    
    const [id, setId] = useState(0);
    const [spreadSheetData, setSpreadSheetData] = useState([]);

    const columns = useMemo(() => [
        {
          ...keyColumn('serialimei', textColumn),
          title: 'Serial/Imei',
        },
        {
          ...keyColumn('name', textColumn),
          title: 'Name',
        },
        {
          ...keyColumn('supplier', textColumn),
          title: 'Supplier',
        },
        {
          ...keyColumn('date', textColumn),
          title: 'Date',
        },
        {
          ...keyColumn('quantity', intColumn),
          title: 'Quantity',
        },
        {
          ...keyColumn('notes', textColumn),
          title: 'Notes',
          cellClassName: "grid-notes"
        },
        {
          ...keyColumn('alvlp', checkboxColumn),
          title: 'AL/VLP',
        },
        {
          ...keyColumn('ul', checkboxColumn),
          title: 'UL',
        },
        {
          ...keyColumn('mdm', checkboxColumn),
          title: 'MDM',
        },
        {
          ...keyColumn('reset', checkboxColumn),
          title: 'Reset',
        },
        {
          ...keyColumn('gtg', checkboxColumn),
          title: 'GTG',
        },
      ], [])

    const isValidDate = (stringToCheck) => {
        // Regular expression to validate "dd/MM/yyyy" format
        const dateRegex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
      
        if (!dateRegex.test(stringToCheck)) {
          return false;
        }
      
        const [day, month, year] = stringToCheck.split('/');
        const numericMonth = parseInt(month, 10);
        const numericDay = parseInt(day, 10);
        const numericYear = parseInt(year, 10);
      
        // Check if the month is between 1 and 12, and the day is valid for the given month
        if (numericMonth < 1 || numericMonth > 12 || numericDay < 1 || numericDay > new Date(numericYear, numericMonth, 0).getDate()) {
          return false;
        }
      
        return true;
    };

    const genId = () => {
        setId(id + 1);
        return id;
    }

    const exportData = async () => {
        await ExcelExport(spreadSheetData);
    }

    const createRow = useCallback(() => ({ id: genId() }), [])
    
    useEffect(() => {
        setValidDate(isValidDate(dateString));
        setDate(dateString);

        setIsLoading(true);

        ApiGetInventoryByDate(dateString)
            .then(res => res.json())
            .then(res => {
                setData(res)
                setIsLoading(false);
                setSpreadSheetData(res)
            });
    }, []);

    return (
        <>
            {
                !validDate ? "Invalid Date"
                : isLoading ? (
                    <Blocks
                        height="80"
                        width="80"
                        color="#4fa94d"
                        ariaLabel="blocks-loading"
                        wrapperStyle={{}}
                        wrapperClass="blocks-wrapper"
                        visible={true}
                    />
                )
                : 
                <>
                    <DynamicDataSheetGrid
                        value={spreadSheetData}
                        onChange={setSpreadSheetData}
                        columns={columns}
                        createRow={createRow}
                    />
                    
                    <Button onClick={exportData} color="success" style={{marginTop: "1vh"}}>
                        Save to .xlsx File
                    </Button>
                </>
            }
        </>
    )
}

export default DateSheet;