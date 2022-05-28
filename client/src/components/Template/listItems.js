import * as React from 'react';
import { useState } from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import AssignmentIcon from '@mui/icons-material/Assignment';
import SearchIcon from '@mui/icons-material/Search';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import { Routes, Route, Link } from "react-router-dom";
import Popup from './Popup';
import Box from '@mui/material/Box';
import './Template.css';
import Button from '@mui/material/Button';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

export const mainListItems = (
  <React.Fragment>
    <ListItemButton>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <nav>
        <Link className='navName' to="/" >
          <ListItemText primary="Dashboard" />
        </Link>
      </nav>
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <SearchIcon />
      </ListItemIcon>
      <nav>
        <Link className='navName' to="/Discover">
        <ListItemText primary="Discover Stocks" />
        </Link>
      </nav>
      
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <NewspaperIcon />
      </ListItemIcon>
      <nav>
        <Link className='navName' to="/News">
        <ListItemText primary="Financial News" />
        </Link>
      </nav>
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <BarChartIcon />
      </ListItemIcon>
      <ListItemText primary="Portfolio Performane" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="work in progress" />
    </ListItemButton>
  </React.Fragment>
);

export default function SecondaryListItems() {
  const [isOpen, setIsOpen] = useState(false);
 
  const togglePopup = () => {
    setIsOpen(!isOpen);
  }
  return (
    <React.Fragment>
      <ListSubheader component="div" inset>
        work in progresss
      </ListSubheader>
      <ListItemButton>
        <ListItemIcon>
          <SettingsIcon />
        </ListItemIcon>
        <ListItemText primary="Settings" />
      </ListItemButton>
      <ListItemButton>
        <ListItemIcon>
          <LogoutIcon />
        </ListItemIcon>
      <ListItemText primary="Log Out" onClick={togglePopup}/>
      </ListItemButton>
      {isOpen && <Popup
      content={<>
      <Box>
        <b></b>
        <strong><p className='ConfirmText'>Confirm Log Out?</p></strong>
        <div className='ConfirmLogOut'>
        <nav>
          <Link className='navName' to="/login">
            <Button variant="outlined" ><ExitToAppIcon />Log Out</Button>
          </Link>
          </nav>
        </div>
      </Box>
      </>}
      handleClose={togglePopup}
    />}
      <ListItemButton>
        <ListItemIcon>
          <AssignmentIcon />
        </ListItemIcon>
        <ListItemText primary="work in progress" />
      </ListItemButton>
      
    </React.Fragment>
  );
}
{/* <nav>
      <Link className='navName' to="/SignIn">
        <ListItemText primary="Log Out" />
      </Link>
    </nav> */}