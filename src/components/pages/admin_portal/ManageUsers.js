import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { AgGridReact } from 'ag-grid-react'; // React Grid Logic
import { Input, Button, ButtonGroup, Modal, ModalHeader, ModalBody, ModalFooter, FormFeedback } from 'reactstrap';
import { Blocks } from 'react-loader-spinner';
import { GrPowerReset } from "react-icons/gr";
import { ApiRegister } from "../../../services/api";
import checkUserGroup from "../../../services/checkUserGroup";
import GroupIDConverter from "../../../utils/GroupIDConverter";
import CreateRandomString from "../../../utils/CreateRandomString";

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

    // Modal states and functions
    const [modal, setModal] = useState(false);
    const [loadingScreen, setLoadingScreen] = useState(false);
    const [creationSuccessful, setCreationSuccessful] = useState(false);
    const [isInvalid, setIsInvalid] = useState(false);
    const [isValidating, setIsValidating] = useState(false);

    // modal create user form states
    const [createUserEmail, setCreateUserEmail] = useState("");
    const [randomPassword, setRandomPassword] = useState(CreateRandomString());

    // toggle states
    const toggle = () => {
        setModal(!modal);
    }

    const closeModal = () => {
        setCreateUserEmail(""); 
        setLoadingScreen(false);
        setCreationSuccessful(false);
        setIsInvalid(false);
        setIsValidating(false);

        reset();
        toggle();
    }

    const handleEmailChange = e => {
        const input = e.target.value;
        if (isInvalid) setIsInvalid(false);
        setCreateUserEmail(input);
    }

    const onCreateUserFormSubmit = () => {
        setIsValidating(true);
        setLoadingScreen(true);

        ApiRegister(createUserEmail, randomPassword)
            .then(res => res.json())
            .then(res => {
                if (res.message === "A user with that email already exists") {                    
                    setIsInvalid(true);
                    setLoadingScreen(false);
                    setIsValidating(false);
                    return;
                }

                if (res.message === "User has been created!") {
                    setLoadingScreen(false);
                    setIsValidating(false);
                    setCreationSuccessful(true);
                    return; 
                }
            }).catch(err=> {
                if (String(err) === "TypeError: Failed to fetch") {
                    // error connecting to server

                }
                
                setLoadingScreen(false);
                setIsValidating(false);
            })
    }

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
                    <Button color='secondary' onClick={reset} className='reset-btn'><GrPowerReset /></Button>                        
                </div>
                                
                <div className="searchFilters">
                    <div className="userGroupsFilter">
                        <h5>Search Filters - User Groups</h5>
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

                    <div className="createUser">
                        <ButtonGroup>
                            <Button color="success" onClick={toggle}>
                                + Create A User
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

            <Modal
                isOpen={modal}
                toggle={toggle}
                backdrop={'static'}
                keyboard={true}
                centered={true}
            >
                <ModalHeader>Create User</ModalHeader>
                <ModalBody>
                {
                    loadingScreen ? (
                    <>
                        <p style={{textAlign:"center"}}>Please wait while your account is being created.</p>
                        
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
                    : creationSuccessful ? ( 
                        <p style={{textAlign:"center"}}>This account has been successfully created! An email has been sent to their email inbox.</p>
                    )
                    : 
                    (
                        // Create user form here
                        <>
                            <form onSubmit={onCreateUserFormSubmit}>
                                <label for="password"> User Email </label>
                                <Input className="account-creation-form-field" type="email" invalid={isInvalid} onChange={handleEmailChange} placeholder="Email" required/>
                                <FormFeedback>
                                    An account with that email already exists!
                                </FormFeedback>

                                <label for="password"> Randomly Generated Password </label>
                                <Input className="account-creation-form-field" id="password" type="text" placeholder="Password" disabled value={randomPassword}/>

                                <Button className="submit" color="primary" type="submit" disabled={isValidating}>
                                    Submit
                                </Button>
                            </form>
                        </>
                    )
                }
                </ModalBody>
                <ModalFooter>
                    <>
                    {
                        creationSuccessful ? (
                            <Button color="primary" onClick={closeModal}>
                                Close
                            </Button>
                        ) :
                        (
                            <Button color="secondary" onClick={closeModal} disabled={isValidating}>
                                Cancel
                            </Button>
                        )
                    }
                        
                    </>
                </ModalFooter>
            </Modal>
        </div>
    )
}

export default ManageUsers;