import { Sidebar, Menu, MenuItem, SubMenu, sidebarClasses, menuClasses } from 'react-pro-sidebar';
import Badge from '../Badge';
import { Link } from 'react-router-dom';
import logo from '../../assets/boxes.png';

const CustomSideNav = () => {          
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
                  component={<Link to="/" />}
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

                <SubMenu label="Account">
                  <MenuItem component={<Link to="/logout" />}> Log Out </MenuItem>
                  <MenuItem> My Account </MenuItem>
                </SubMenu>
            </Menu>
        </Sidebar>
    );
}

export default CustomSideNav;