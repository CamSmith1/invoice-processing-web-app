import React from 'react'
import Main from './Main'
import { makeStyles } from '@material-ui/core/styles';

import Labels from './Labels'

const useStyles = makeStyles((theme) => ({
    body : {
      display : 'flex'
    }
  }));
  

function AppTemplate() {
    const classes = useStyles();

    return (
        <div className={classes.body}>
            <Labels/>
            <Main/>
        </div>
    )
}

export default AppTemplate
