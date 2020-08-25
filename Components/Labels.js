import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Toolbar from '@material-ui/core/Toolbar';
import DeleteIcon from '@material-ui/icons/Delete';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import {connect} from 'react-redux'

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { removeLabel } from '../Redux/labels/label-actions';

const drawerWidth = 240;


const useStyles = makeStyles((theme) => ({

  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: 'auto',
  },
  listItem:{
    paddingLeft : '5px'
  },
  ListIcon:{
    minWidth : '10px'
  },
}));

const Labels =  ({labels , removeLabel}) => {
  const classes = useStyles();

  return (
    <div>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Toolbar />
        <div className={classes.drawerContainer}>
          <List>
            { labels.map( (label) => (
              <div key={label.id}>
              <ListItem button className={classes.listItem}>
                <ListItemIcon className={classes.ListIcon}>
                    <NavigateNextIcon fontSize="small"/>
                </ListItemIcon>
                <ListItemText primary={label.label} />
                <ListItemIcon className={classes.ListIcon}>
                    <DeleteIcon onClick={() => removeLabel(label.id)} fontSize="small"/>
                </ListItemIcon>
                
              </ListItem>
              <Divider />
              </div>
            ))    
            }
          </List>
        </div>
      </Drawer>
    </div>
  );
}

const mapStateToProps = state => {
  return{
    labels : state.labels
  }
}


const mapDispatchToProps = dispatch => {
  return{
    removeLabel : (id) => dispatch(removeLabel(id))
  }
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Labels)