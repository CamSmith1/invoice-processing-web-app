import React from 'react'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    container : {
        display : 'flex',
        height : '87vh',
        justifyContent : 'center',
        alignItems : 'center',
    },
    buttonContainer : {
        textAlign : 'center',
        display : 'grid',
        gridTemplateColumns : '1fr 1fr',
        width : "500px",
        height : "500px",
        gridRowGap : '20px',
        gridColumnGap : '20px',
    },

  button:{
    transition: 'box-shadow .3s',
    background : '#3f51b5',
    display : 'flex',
    justifyContent : 'center',
    alignItems : 'center',
    color : 'white',
    '&:hover': {
        cursor : 'pointer',
        boxShadow: '0 0 10px #07c',

     },
  }
}))

const Integrations = () => {
    const classes = useStyles();
    

    const handleClick = () => {
        //do something here.
    }

    return (
        <div style={{textAlign : 'center'}}>
            <h1>Integrations</h1>
        <div className={classes.container}>
            <div className={classes.buttonContainer}>
                <div 
                    className={classes.button}
                    onClick={handleClick}
                >
                    Palace
                </div>
                <div 
                    className={classes.button}
                    onClick={handleClick}
                >
                    MyDesktop
                </div >
                <div 
                    className={classes.button}
                    onClick={handleClick}
                >
                    QPMS
                </div>
                <div 
                    className={classes.button}
                    onClick={handleClick}
                >
                    Salesforce
                </div>
                <div 
                    className={classes.button}
                    onClick={handleClick}
                >
                    Google Sheets
                </div>
                <div 
                    className={classes.button}
                    onClick={handleClick}
                >
                    Custom
                </div>
            </div>
        </div>
        </div>
    )
}

export default Integrations
