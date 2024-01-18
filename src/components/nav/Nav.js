import { Sidebar, Menu, MenuItem, SubMenu, sidebarClasses, menuClasses } from 'react-pro-sidebar';
import Badge from '../Badge';
import { Link } from 'react-router-dom';

const CustomSideNav = () => {          
    return (
        <Sidebar
          rootStyles={{
            [`.${sidebarClasses.container}`]: {
              backgroundColor: 'white',
              color: '#607489',
              minHeight: "100vh",
              minWidth: "10vw,",
              maxWidth: "20vw",
            },
          }}
        >
          <div className='nav-header'>
            <h1>Tech22 <br /> Inventory System </h1>
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

                <MenuItem 
                  suffix={<Badge text={"3"} />}
                  component={<Link to="/outstanding" />}
                > 
                  Outstanding Inventory 
                </MenuItem>

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
                  <MenuItem> Login </MenuItem>
                  <MenuItem> Register </MenuItem>
                </SubMenu>
            </Menu>
        </Sidebar>
    );
}

export default CustomSideNav;