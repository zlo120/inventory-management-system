import { useState, useMemo, useCallback, useEffect } from "react";
import { DynamicDataSheetGrid, textColumn, keyColumn, dateColumn, intColumn, checkboxColumn } from "react-datasheet-grid";
import 'react-datasheet-grid/dist/style.css'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Blocks } from 'react-loader-spinner';
import FormatData from "../../utils/FormatData";
import ApiSend from "../../services/api";

const Add = () => {
  const [isLoading, setLoading] = useState(false);  
  const [modal, setModal] = useState(false);
  const [keyboard, setKeyboard] = useState(true);
  const toggle = () => {
    if (!isLoading) setModal(!modal)
  }

  const [id, setId] = useState(0);
  const [data, setData] = useState([]);

  const initialNumOfRows = 50;

  useEffect(() => {
    let emptyData = [];
    for (let i = 1; i <= initialNumOfRows; i++) {
      emptyData.push({
        "serialimei" : null,
        "name" : null,
        "supplier" : null,
        "date" : null,
        "quantity" : null,
        "notes" : null,
        "alvlp" : null,
        "ul" : null,
        "mdm" : null,
        "reset" : null,
        "gtg" : null,
      })
    }

    setData(emptyData);
  }, [])

  const genId = () => {
    setId(id + 1);
    return id;
  }

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
      ...keyColumn('date', dateColumn),
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

  const createRow = useCallback(() => ({ id: genId() }), [])

  const sendData = () => {
    setLoading(true);
  }

  return (      
      <div style={{minHeight: "80vh"}}>
        <h1>Add Inventory</h1>

        <DynamicDataSheetGrid
          value={data}
          onChange={setData}
          columns={columns}
          createRow={createRow}
        />
        
        <Button onClick={toggle} color="success" style={{marginTop: "1vh"}}>
          Commit
        </Button>

        <Modal
          isOpen={modal}
          toggle={toggle}
          backdrop={'static'}
          keyboard={true}
          centered={true}
        >
          <ModalHeader>Confirm Data Entry</ModalHeader>
          <ModalBody>
            {
              !isLoading ? (<p>Are you ready to add this data into the database?</p>)
              : 
              (
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
            }
          </ModalBody>
          <ModalFooter>
            {
              !isLoading ? (
              <>
                <Button color="primary" onClick={sendData}>
                  Enter Data
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
        
      </div>
  )
}

export default Add;