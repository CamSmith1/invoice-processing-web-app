import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import {Link} from 'react-router-dom'

import AccountCircle from '@material-ui/icons/AccountCircle';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'







const useStyles = makeStyles((theme) => ({

  appBar: {
    zIndex: theme.zIndex.drawer + 1,

  },
  icon:{
    marginRight : '10px'
  },
  login:{
    color : 'white',
    marginLeft : 'auto',
    textDecoration : 'none'

  },
  link:{
    textDecoration : 'none'
  },
  button : {
    color : 'white',
    border: 'none',

  },

  menuButton: {
    marginRight: theme.spacing(2),
    
  },
  toolbar:{
    display : 'flex',
    justifyContent : 'start',
  }
}));

const Navbar = () => {
  const classes = useStyles();
  const [auth, setAuth] = React.useState(true); //Verify authenticated user
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);


  const handleChange = (event) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };




  return (
    <AppBar position="relative" className={classes.appBar}>
      <Toolbar className={classes.toolbar}>
        <Link className={classes.link} to="/">
          <Button 
          className={classes.button}>
              Home
          </Button>
        </Link>
{/*         <Link className={classes.link} to="/dashboard">
          <Button 
          className={classes.button}
          >
            Dashboard
          </Button>
        </Link> */}
{/*         <Link className={classes.link} to="/app">
          <Button 
          className={classes.button}
          >
            Create Template
          </Button>
        </Link> */}
{/*         <Link className={classes.link} to="/invoices">
          <Button 
          className={classes.button}
          >
            Process Invoices
          </Button>
        </Link> */}
{/*       
        <Link className={classes.link} to="/integrations">
          <Button 
          className={classes.button}
          >
            Integrations
          </Button>
        </Link> */}

        
        <DropdownButton id="dropdown-item-button" title="Invoice Manager" className={classes.button} >
        <Link className={classes.link} to="/app">
          <Dropdown.Item as="button">Create Invoice Template</Dropdown.Item>
          </Link>
          <Link className={classes.link} to="/app">
         <Dropdown.Item as="button">Manage Templates</Dropdown.Item>
         </Link>
         <Link className={classes.link} to="/invoices">
         <Dropdown.Item as="button">Process Invoices</Dropdown.Item>
         </Link>
        </DropdownButton>
      
        



        
 

        <div className={classes.login}>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>My account</MenuItem>
              </Menu>
            </div>
       
      </Toolbar>
    </AppBar>
  );
}

export default Navbar
