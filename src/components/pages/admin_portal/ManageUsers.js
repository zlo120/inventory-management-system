import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { AgGridReact } from 'ag-grid-react'; // React Grid Logic
import { GrPowerReset } from "react-icons/gr";
import { Input, Button, ButtonGroup } from 'reactstrap';
import checkUserGroup from "../../../services/checkUserGroup";
import GroupIDConverter from "../../../utils/GroupIDConverter";

import "ag-grid-community/styles/ag-grid.css"; // Core CSS
import "ag-grid-community/styles/ag-theme-quartz.css"; // Theme
import { ApiGetAllUsers } from "../../../services/api";

const ManageUsers = () => {
    const navigate = useNavigate();
    const [rowData, setRowData] = useState([]);
    const [backUpRowData, setBackUpRowData] = useState([]);

    const getAndProcessData = () => {
        ApiGetAllUsers()
            .then(res => res.json())
            .then(res => {
                let data = [];

                res.forEach(user => {
                    let temp = {}
                    temp.id = user.id;
                    temp.email = user.email;
                    temp.user_type = GroupIDConverter(user.groupId);
                    temp.user_has_signed_in = user.userCreatedPassword;

                    data.push(temp)
                })

                setRowData(data);
                setBackUpRowData(data);
            });
    }

    // Column Definitions: Defines & controls grid columns.
    const defaultColDef = useMemo(() => {
        return {
          flex: 1,
          minWidth: 10,
        };
    }, []);
    const [colDefs, setColDefs] = useState([
        { 
        field: "id",
        minWidth: 100
        },
        {
        field: "email",
        minWidth: 200,
        },
        { 
        field: "user_type",
        minWidth: 200,
        },
        {
        field: "user_has_signed_in",
        minWidth: 200,
        },
    ]);

    // update table
    const updateTable = (searchInput) => {
        setRowData(backUpRowData.filter(data => {

            let email = searchInput;
            
            if (searchInput === undefined) {
                email = emailInput;
            }
            
            const emailInputExists = !(email === null || email === "");            
            const emailFilter =  data.email.includes(email);

            const employeeTypeFilterExists = userGroupsCheckBoxSelected.length > 0;
            const employeeFilter = userGroupsCheckBoxSelected.includes(1) && data.user_type === "Employee";
            const adminFilter = userGroupsCheckBoxSelected.includes(2) && data.user_type === "Admin";
            const masterFilter = userGroupsCheckBoxSelected.includes(3) && data.user_type === "Master";

            if (!emailInputExists && !employeeTypeFilterExists) return true;

            if (emailInputExists && !employeeTypeFilterExists) return emailFilter;
            
            if (emailInputExists) return (emailFilter) && (employeeFilter || adminFilter || masterFilter);
            return employeeFilter || adminFilter || masterFilter;
        }));
    }

    // Search input handlers
    const [emailInput, setEmailInput] = useState(null);
    const handleTextChange = event => {        
        const input = event.target.value;
        setEmailInput(input);
        updateTable(input);
    }
    const handleSubmit = e => {
        e.preventDefault();
        updateTable();
    }
    const reset = () => {
        getAndProcessData();
    }

    // check boxes    
    const [userGroupsCheckBoxSelected, setUserGroupsCheckBoxSelected] = useState([]);
    // DESCRIPTION: userGroupsCheckBoxSelected is an array, it will contain 1, 2 or 3 depending on which check box is selected
    // 1: Employee, 2: Admin, 3: Master
    const onUserGroupsCheckboxBtnClick = (selected) => {
        const index = userGroupsCheckBoxSelected.indexOf(selected);
        if (index < 0) {
            userGroupsCheckBoxSelected.push(selected);
        } else {
            userGroupsCheckBoxSelected.splice(index, 1);
        }
        setUserGroupsCheckBoxSelected([...userGroupsCheckBoxSelected]);
        updateTable();
    };

    useEffect(() => {        
        const userGroups = require('../../../models/userGroups');
        if (!checkUserGroup(userGroups.admin)) navigate('/inventory');

        getAndProcessData();
    }, []);

    return (        
        <div className="ag-theme-quartz" style={{ height: "75vh", minWidth: "80vw"}}>        
            <h1>Manage Users</h1>

            <form onSubmit={handleSubmit}>
                <div className='main-search'>
                    <Input className='inventory-search' placeholder='Email' onChange={handleTextChange}/>                
                </div>
                                
                <h3>Search Filters</h3>
                <div className="searchFilters">
                    <div className="userGroupsFilter">
                        <h5>User Groups</h5>
                        <ButtonGroup>
                            <Button
                                color="primary"
                                outline
                                onClick={() => onUserGroupsCheckboxBtnClick(1)}
                                active={userGroupsCheckBoxSelected.includes(1)}
                            >
                                Employee
                            </Button>
                            <Button
                                color="primary"
                                outline
                                onClick={() => onUserGroupsCheckboxBtnClick(2)}
                                active={userGroupsCheckBoxSelected.includes(2)}
                            >
                                Admin
                            </Button>
                            <Button
                                color="primary"
                                outline
                                onClick={() => onUserGroupsCheckboxBtnClick(3)}
                                active={userGroupsCheckBoxSelected.includes(3)}
                            >
                                Master
                            </Button>
                        </ButtonGroup>
                    </div>
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
    )
}

export default ManageUsers;