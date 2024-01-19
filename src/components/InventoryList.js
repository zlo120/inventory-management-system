import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { AgGridReact } from 'ag-grid-react'; // React Grid Logic
import "ag-grid-community/styles/ag-grid.css"; // Core CSS
import "ag-grid-community/styles/ag-theme-quartz.css"; // Theme
import { Form, FormGroup, Input, Button } from 'reactstrap';
import { ApiGetAllData, ApiGetAllBySerial, ApiGetAllByName, ApiGetAllByDate } from '../services/api';
import { GrPowerReset } from "react-icons/gr";

const InventoryList = (data) => {
  const navigate = useNavigate();
  const defaultColDef = useMemo(() => {
    return {
      flex: 1,
      minWidth: 10,
    };
  }, []);

  const [rowData, setRowData] = useState([])

  // Column Definitions: Defines & controls grid columns.
  const [colDefs, setColDefs] = useState([
    { 
      field: "id",
      maxWidth: 100
    },
    { 
      field: "serialimei",
      minWidth: 200,
    },
    { 
      field: "name",
      minWidth: 200,
    },
    {
      field: "supplier",
      minWidth: 200,
    },
    { 
      field: "date" , 
      maxWidth: 150,
    },
    { 
      field: "quantity", 
      maxWidth: 90, 
    },
    { 
      field: "notes",
      minWidth: 800
    }
  ]);

  const [inputType, setInputType] = useState("Serial/Imei");
  const [previousInputType, setPreviousInputType] = useState("Serial/Imei");
  const [serialInput, setSerialInput] = useState(null);
  const [nameInput, setNameInput] = useState(null);
  const [dateInput, setDateInput] = useState(null);

  const handleInputChange = event => {
    const input = event.target.value;   
    setInputType(input);
  };

  const handleTextChange = event => {
    const input = event.target.value;
    setSerialInput(input); 
    setNameInput(input);

    var dateParts = input.split('-');
    let formattedDate = dateParts[2] + '/' + dateParts[1] + '/' + dateParts[0];
    setDateInput(formattedDate);
  }

  const handleSubmit = e => {
    e.preventDefault();    
    if (serialInput === null) return;

    if (inputType === "Serial/Imei"){
      ApiGetAllBySerial(serialInput)
        .then(res => res.json())
        .then(res => setRowData(res));
    }
    else if (inputType === "Name") {
      ApiGetAllByName(nameInput)
        .then(res => res.json())
        .then(res => setRowData(res));
    }
    else if (inputType === "Date") {
      ApiGetAllByDate(dateInput)
        .then(res => res.json())
        .then(res => setRowData(res));
    }
  }

  const reset = () => {
    ApiGetAllData()
      .then(res => res.json())
      .then(res => setRowData(res))
  }

  useEffect(() => {
    ApiGetAllData()
      .then(res => res.json())
      .then(res => setRowData(res))
      .catch(err => {
        navigate("/login?error=true");
      })
  }, [])
  
  return (
    <div className="ag-theme-quartz" style={{ height: "75vh"}}>
      <h1>Search Inventory</h1>

      <form onSubmit={handleSubmit}>
        <div className='main-search'>
            {
              inputType === "Serial/Imei" ? (<Input className='inventory-search' placeholder='Serial/Imei' onChange={handleTextChange}/>)
              : inputType === "Name" ? (<Input className='inventory-search' placeholder='Name' onChange={handleTextChange}/>)
              : <Input placeholder="date placeholder" type="date" id='datetimepicker' onChange={handleTextChange}/>
            }
            <Input
              id="SearchTypeSelector"
              type="select"
              onChange={handleInputChange}
            >
              <option>
                Serial/Imei
              </option>
              <option>
                Name
              </option>
              <option>
                Date
              </option>
            </Input>
            <Button color='primary' type='submit' className='submit-btn'>Search</Button>
            <Button color='secondary' onClick={reset} className='reset-btn'><GrPowerReset /></Button>          
        </div>
      </form>
      
      <AgGridReact 
        rowData={rowData} 
        columnDefs={colDefs} 
        defaultColDef={defaultColDef}
        rowSelection={'multiple'}
        sideBar={true}
        suppressRowClickSelection={true}
      />
    </div>
  );
};

export default InventoryList;