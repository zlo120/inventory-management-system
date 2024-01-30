import { useEffect, useState, useMemo, useCallback } from "react";
import { ApiGetAllByDate, ApiUpdateInventoryList } from "../../../services/api";
import { Blocks } from 'react-loader-spinner';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { DynamicDataSheetGrid, textColumn, keyColumn, dateColumn, intColumn, checkboxColumn } from "react-datasheet-grid";
import 'react-datasheet-grid/dist/style.css'
import ExcelExport from "../../../services/excelexport";
import FormatData from "../../../utils/FormatData";
import ValidateData from "../../../utils/ValidateData";

const DateSheet = ({dateString}) => {  
    const [insertSuccessful, setInsertSuccessful] = useState(false);
    const [modal, setModal] = useState(false);
    const [sendingLoading, setSendingLoading] = useState(false);
    const toggle = () => {
      if (!isLoading) setModal(!modal)
    }

    // this method was developed because for some reason the date format would change
    //  from dd/MM/yyyy to yyyy-MM-dd
    const resetDateFormat = () => {
      setSpreadSheetData(
        spreadSheetData.map(entry => {
          const [year, month, day] = entry.date.split('-');
          const formattedDateString = `${day}/${month}/${year}`;
          entry.date = formattedDateString
          return entry;
        })
      )
    }

    const successToggle = () => {
      setBackUpData(spreadSheetData);
      if (sendingLoading) setSendingLoading(false);
      if (insertSuccessful) setInsertSuccessful(false);

      resetDateFormat();

      setDisabledEditing(true);
      setModal(!modal)
    }

    const invalidDateToggle = () => {
      resetDateFormat();
      setInvalidFields(false);
      setSendingLoading(false);
      setInsertSuccessful(false);
      setInvalidDate(false);
      setModal(!modal);
    }

    const invalidFieldsToggle = () => {
      resetDateFormat();
      setInvalidFields(false);
      setSendingLoading(false);
      setInsertSuccessful(false);
      setInvalidDate(false);
      setModal(!modal);
    }

    const [date, setDate] = useState(null);
    const [validDate, setValidDate] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [invalidDate, setInvalidDate] = useState(false);
    const [disabledEditing, setDisabledEditing] = useState(true);
    const [invalidFields, setInvalidFields] = useState(false);
    
    const [id, setId] = useState(0);
    const [spreadSheetData, setSpreadSheetData] = useState([]);
    const [backupData, setBackUpData] = useState([]);

    const columns = useMemo(() => [
        {
          ...keyColumn('serialimei', textColumn),
          title: 'Serial/Imei',
          disabled: disabledEditing
        },
        {
          ...keyColumn('name', textColumn),
          title: 'Name',
          disabled: disabledEditing
        },
        {
          ...keyColumn('supplier', textColumn),
          title: 'Supplier',
          disabled: disabledEditing
        },
        {
          ...keyColumn('date', textColumn),
          title: 'Date',
          disabled: disabledEditing
        },
        {
          ...keyColumn('quantity', intColumn),
          title: 'Quantity',
          disabled: disabledEditing
        },
        {
          ...keyColumn('notes', textColumn),
          title: 'Notes',
          cellClassName: "grid-notes",
          disabled: disabledEditing
        },
        {
          ...keyColumn('alvlp', checkboxColumn),
          title: 'AL/VLP',
          disabled: disabledEditing
        },
        {
          ...keyColumn('ul', checkboxColumn),
          title: 'UL',
          disabled: disabledEditing
        },
        {
          ...keyColumn('mdm', checkboxColumn),
          title: 'MDM',
          disabled: disabledEditing
        },
        {
          ...keyColumn('reset', checkboxColumn),
          title: 'Reset',
          disabled: disabledEditing
        },
        {
          ...keyColumn('gtg', checkboxColumn),
          title: 'GTG',
          disabled: disabledEditing
        },
      ], [disabledEditing])

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

    const toggleEdit = () => {
      if (disabledEditing) {
        setDisabledEditing(false);
      }
      else {        
        setSpreadSheetData(backupData);
        setDisabledEditing(true)
      }
    }

    const sendData = () => {
      setSendingLoading(true);

      for(let i = 0; i < spreadSheetData.length; i++) {
        console.log(spreadSheetData[i].date)
        if (!isValidDate(spreadSheetData[i].date)) {
          setInvalidDate(true);
          return;
        }
      }
  
      const formattedData = FormatData(spreadSheetData);
  
      if (formattedData.length == 0) {
        return setSendingLoading(false);
      }
  
      if (!ValidateData(spreadSheetData)) {
        return setSendingLoading(false);
      }
  
      ApiUpdateInventoryList(formattedData)
        .then(res => res.json())
        .then(res => {
          if (res === "Successful!") {
            setSendingLoading(false);
            setInsertSuccessful(true);
          }
          if (res.title === "One or more validation errors occurred.") {
            setSendingLoading(false);
            setInvalidFields(true);
          }
        })
        .catch(res => console.log(`Error is: ${res}`));
    }
    
    useEffect(() => {

        

        setValidDate(isValidDate(dateString));
        setDate(dateString);

        setIsLoading(true);

        ApiGetAllByDate(dateString)
            .then(res => res.json())
            .then(res => {
                setIsLoading(false);
                setSpreadSheetData(res)
                setBackUpData(res)
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

                    {
                      disabledEditing ? (
                        <Button onClick={toggleEdit} color="secondary" style={{marginTop: "1vh", marginLeft: "1vh"}}>
                            Edit data
                        </Button>
                      ) : (
                        <>
                          <Button color="primary" onClick={toggle} style={{marginTop: "1vh", marginLeft: "1vh"}}>
                              Commit Edit
                          </Button>

                          <Button color="secondary" onClick={toggleEdit} style={{marginTop: "1vh", marginLeft: "1vh"}}>
                              Cancel Edit
                          </Button>
                        </> 
                      )
                    }                    
                </>
            }

          <Modal
            isOpen={modal}
            toggle={toggle}
            backdrop={'static'}
            keyboard={true}
            centered={true}
          >
            <ModalHeader>Confirm Update</ModalHeader>
            <ModalBody>
              {
                invalidFields ? (
                  <>
                    <strong>Missing fields error!</strong>
                    <p>The fields: Serial/Imei, Name, Supplier, Date and Quantity, must be filled out.</p>
                  </>
                )
                : invalidDate ? (
                  <p>A date you have entered is invalid...</p>
                )
                : sendingLoading ? (
                  <>
                    <p style={{textAlign:"center"}}>Please wait while it is being entered</p>
                    
                    <div className="loader">
                      <Blocks
                        height="80"
                        width="80"
                        color="#4fa94d"
                        ariaLabel="blocks-loading"
                        wrapperStyle={{}}
                        wrapperClass="blocks-wrapper"
                        visible={true}
                      />
                    </div>
                  </>
                )
                : insertSuccessful ? ( 
                  <>
                    <p style={{textAlign:"center"}}>Your data has been successfully updated!</p>
                  </> 
                )
                : 
                (
                  <p>Are you ready to update this data in the database?</p>
                )
              }
            </ModalBody>
            <ModalFooter>
              {
                invalidFields ? (
                  <>
                    <Button color="primary" onClick={invalidFieldsToggle}>
                      Close
                    </Button>
                  </>
                )
                : invalidDate ? (
                  <>
                    <Button color="primary" onClick={invalidDateToggle}>
                      Okay
                    </Button>
                  </>
                )
                : insertSuccessful ? (
                  <>
                    <Button color="primary" onClick={successToggle}>
                      Done
                    </Button>
                  </>
                )
                : !sendingLoading ? (
                <>
                  <Button color="primary" onClick={sendData}>
                    Enter Updated Data
                  </Button>
                  <Button color="secondary" onClick={toggle}>
                    Cancel
                  </Button>
                </>
                )
                :
                <>
                  <Button color="primary" disabled>
                  Enter Data
                </Button>
                <Button color="secondary" disabled>
                  Cancel
                </Button>
                </>
              }
            </ModalFooter>
          </Modal>

        </>
    )
}

export default DateSheet;