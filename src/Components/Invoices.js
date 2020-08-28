import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';

import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
    container : {
        display : 'flex',
        justifyContent : 'center',
        height : '87vh'
    },
    optionsContainer : {
        display : 'flex',
        flexDirection : 'column',
        alignItems : 'center',
        justifyContent : 'space-around'
    },
    listContainer : {
        margin : '40px 0 30px 40px',
        width : '400px',
        border : '1px solid grey'
    },

  select:{
      width: 150,
  },
  button :{
    width: 150,
  },
  input: {
    display: 'none',
  },
}))

const Invoices = () => {
  const classes = useStyles();
  const [template, setTemplate] = React.useState('');
  const [integration, setIntegration] = React.useState('');
  const [openTempSelect, setOpenTempSelect] = React.useState(false);
  const [openIntSelect , setOpenIntSelect] = React.useState(false);
  const [files , setFiles] = React.useState([]);

  const handleTemplateChange = (event) => {
    setTemplate(event.target.value);
  };
  const handleIntegrationChange = (event) => {
    setIntegration(event.target.value);
  };
  const handleFileUpload = (event) => {
    const arr = files.concat(Object.values(event.target.files));
    setFiles(arr)
    console.log(arr)
}


  const handleTempSelectClose = () => {
    setOpenTempSelect(false);
  };

  const handleTempSelectOpen = () => {
    setOpenTempSelect(true);
  };
  const handleIntSelectClose = () => {
    setOpenIntSelect(false);
  };

  const handleIntSelectOpen = () => {
    setOpenIntSelect(true);
  };


  return (
    <div className={classes.container}>
        <div className={classes.optionsContainer}>
            <FormControl className={classes.formControl}>
                <InputLabel id="demo-controlled-open-select-label">Select Template</InputLabel>
                <Select
                    className={classes.select}
                    labelId="demo-controlled-open-select-label"
                    id="demo-controlled-open-select"
                    open={openTempSelect}
                    onClose={handleTempSelectClose}
                    onOpen={handleTempSelectOpen}
                    value={template}
                    onChange={handleTemplateChange}
                >
                    <MenuItem value="">
                    <em>None</em>
                    </MenuItem>
                    <MenuItem value={1}>Template 1</MenuItem>
                    <MenuItem value={2}>Template 2</MenuItem>
                    <MenuItem value={3}>Template 3</MenuItem>
                </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
                <InputLabel id="demo-controlled-open-select2-label">Select Integration</InputLabel>
                <Select
                    className={classes.select}
                    labelId="demo-controlled-open-select2-label"
                    id="demo-controlled-open-select-2"
                    open={openIntSelect}
                    onClose={handleIntSelectClose}
                    onOpen={handleIntSelectOpen}
                    value={integration}
                    onChange={handleIntegrationChange}
                >
                    <MenuItem value="">
                    <em>None</em>
                    </MenuItem>
                    <MenuItem value={1}>Integration 1</MenuItem>
                    <MenuItem value={2}>Integration 2</MenuItem>
                    <MenuItem value={3}>Integration 3</MenuItem>
                </Select>
            </FormControl>
            <input
                accept="image/*"
                className={classes.input}
                id="contained-button-file"
                multiple
                type="file"
                onChange={handleFileUpload}
            />
            
            <label htmlFor="contained-button-file">
            <Button className={classes.button} variant="contained" color="primary" component="span">
                Add File
            </Button>
            </label>
                <Button 
                className={classes.button} 
                variant="contained" 
                color="primary" 
                // onClick={} 
                >
                Submit
                </Button>
        </div>
        <div className ={classes.listContainer}>
        <List>
                { files.map( (file) => (
                <div key={file.size}>
                <ListItem>
                    <p>{file.name}</p>
                </ListItem>
                <Divider />
                </div>
                ))    
                }
            </List>
        </div>
    </div>
  );
}

export default Invoices