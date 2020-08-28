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
        height : "300px",
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
        <div className={classes.container}>
            <div className={classes.buttonContainer}>
                <div 
                    className={classes.button}
                    onClick={handleClick}
                >
                    Integration 1
                </div>
                <div 
                    className={classes.button}
                    onClick={handleClick}
                >
                    Integration 2
                </div >
                <div 
                    className={classes.button}
                    onClick={handleClick}
                >
                    Integration 3
                </div>
                <div 
                    className={classes.button}
                    onClick={handleClick}
                >
                    Integration 4
                </div>
            </div>
        </div>
    )
}

export default Integrations
