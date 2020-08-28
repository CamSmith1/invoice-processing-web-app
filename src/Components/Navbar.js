import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import {Link} from 'react-router-dom'


const useStyles = makeStyles((theme) => ({

  appBar: {
    zIndex: theme.zIndex.drawer + 1,

  },
  icon:{
    marginRight : '10px'
  },
  link:{
    textDecoration : 'none'
  },
  button : {
    color : 'white'
  },
  toolbar:{
    display : 'flex',
    justifyContent : 'space-around',
  }
}));

const Navbar = () => {
  const classes = useStyles();

  return (
    <AppBar position="relative" className={classes.appBar}>
      <Toolbar className={classes.toolbar}>
        <Link className={classes.link} to="/">
          <Button 
          className={classes.button}>
              Home
          </Button>
        </Link>
        <Link className={classes.link} to="/dashboard">
          <Button 
          className={classes.button}
          >
            Dashboard
          </Button>
        </Link>
        <Link className={classes.link} to="/app">
          <Button 
          className={classes.button}
          >
            Create Template
          </Button>
        </Link>
        <Link className={classes.link} to="/invoices">
          <Button 
          className={classes.button}
          >
            Process Invoices
          </Button>
        </Link>
        <Link className={classes.link} to="/integrations">
          <Button 
          className={classes.button}
          >
            Integrations
          </Button>
        </Link>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar
