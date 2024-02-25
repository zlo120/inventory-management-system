import { Sidebar, Menu, MenuItem, SubMenu, sidebarClasses, menuClasses } from 'react-pro-sidebar';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import checkUserGroup from '../../services/checkUserGroup';

import Badge from '../Badge';
import logo from '../../assets/boxes.png'; 

const CustomSideNav = () => {   
  const userGroups = require('../../models/userGroups');
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (checkUserGroup(userGroups.admin)) setIsAdmin(true);
  }, []);

  return (
      <Sidebar
        rootStyles={{
          [`.${sidebarClasses.container}`]: {
            backgroundColor: 'white',
            color: '#607489',
            minHeight: "100vh",
          },
        }}
      >
        <div className='nav-header' style={{paddingTop: "3vh"}}>
          <img src={logo} style={{width: "50%"}} />
          <h3>Tech22 <br /> Inventory System </h3>
        </div>
          <Menu
            menuItemStyles={{
              button: {
                [`&.${menuClasses.disabled}`]: {
                  color: 'white',
                },
                '&:hover': {
                  backgroundColor: '#c5e4ff',
                  color: '#44596e',
                },
              },
            }}
          >                
              <MenuItem                   
                component={<Link to="/inventory" />}
              > 
                Main Inventory 
              </MenuItem>

              {/* <MenuItem 
                suffix={<Badge text={"3"} />}
                component={<Link to="/outstanding" />}
              > 
                Outstanding Inventory 
              </MenuItem> */}

              <MenuItem 
                component={<Link to="/add" />}
              > 
                Add Inventory 
              </MenuItem>
              
              <MenuItem 
                component={<Link to="/sheets" />}
              > 
                Sheets 
              </MenuItem>

              {
                isAdmin ? (
                  <MenuItem 
                    component={<Link to="/admin-portal" />}
                  > 
                    Admin Portal 
                  </MenuItem>
                ) : null
              }

              <SubMenu label="Account">
                <MenuItem> My Account </MenuItem>
                <MenuItem component={<Link to="/logout" />}> Log Out </MenuItem>
              </SubMenu>
          </Menu>
      </Sidebar>
  );
}

export default CustomSideNav;