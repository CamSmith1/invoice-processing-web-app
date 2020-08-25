import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import HomeIcon from '@material-ui/icons/Home';

const useStyles = makeStyles((theme) => ({

  appBar: {
    zIndex: theme.zIndex.drawer + 1,

  },
  icon:{
    marginRight : '10px'
  }
}));

const Navbar = () => {
  const classes = useStyles();

  return (
      <AppBar position="relative" className={classes.appBar}>
        <Toolbar>
          <HomeIcon href="#" fontSize="large" className={classes.icon}/>
        </Toolbar>
      </AppBar>
  );
}

export default Navbar
