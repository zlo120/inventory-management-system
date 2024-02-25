import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import checkUserGroup from "../../../services/checkUserGroup";

const AdminPortal = () => {
    const navigate = useNavigate();

    useEffect(() => {        
        const userGroups = require('../../../models/userGroups');
        if (!checkUserGroup(userGroups.admin)) navigate('/inventory');
    }, []);

    return (
        <>
            <h1>Admin Portal</h1>
            <ul>
                <li><Link to="/admin-portal/manage-users" >Manage users</Link></li>
                <li><a href="#">Manage locations</a></li>
                <li><a href="#">Manage statuses</a></li>
            </ul>
        </>
    )
}

export default AdminPortal;