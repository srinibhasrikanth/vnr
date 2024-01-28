import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';

const AddResource = ({ onResourcePersonAdded }) => {
  const [resourcePersonData, setResourcePersonData] = useState({
    name: '',
    designation: '',
    phoneNo: '',
    rollNo: '',
    idNumber: '',
  });

  const handleInputChange = (field, value) => {
    setResourcePersonData({
      ...resourcePersonData,
      [field]: value,
    });
  };

  const handleSubmit = () => {
    // Implement logic to handle the submitted resource person data
    console.log('Resource person data submitted:', resourcePersonData);
    // You can add further processing or send the data to an API

    // Call the parent function with the resource person data
    onResourcePersonAdded(resourcePersonData);
    // Clear the form or reset state if needed
    setResourcePersonData({
      name: '',
      designation: '',
      phoneNo: '',
      rollNo: '',
      idNumber: '',
    });
  };

  const fieldStyle = {
    marginBottom: '20px',
    width: '100%',
  };

  const containerStyle = {
    textAlign: 'center',
    maxWidth: '600px',
    margin: 'auto',
    paddingTop: '30px',
  };

  return (
    <div style={containerStyle}>
      <Typography variant="h5" mb={2}>
        Add Resource Person
      </Typography>
      <TextField
        label="Name"
        variant="outlined"
        required
        style={fieldStyle}
        onChange={(e) => handleInputChange('name', e.target.value)}
        value={resourcePersonData.name}
      />
      <TextField
        label="Designation (Student/Faculty)"
        select
        variant="outlined"
        required
        style={fieldStyle}
        onChange={(e) => handleInputChange('designation', e.target.value)}
        value={resourcePersonData.designation}
      >
        {['Student', 'Faculty'].map((designation) => (
          <MenuItem key={designation} value={designation}>
            {designation}
          </MenuItem>
        ))}
      </TextField>
      {resourcePersonData.designation === 'Student' ? (
        <TextField
          label="Roll Number"
          variant="outlined"
          required
          style={fieldStyle}
          onChange={(e) => handleInputChange('rollNo', e.target.value)}
          value={resourcePersonData.rollNo}
        />
      ) : (
        <TextField
          label="ID Number"
          variant="outlined"
          required
          style={fieldStyle}
          onChange={(e) => handleInputChange('idNumber', e.target.value)}
          value={resourcePersonData.idNumber}
        />
      )}
      <TextField
        label="Phone Number"
        variant="outlined"
        required
        style={fieldStyle}
        onChange={(e) => handleInputChange('phoneNo', e.target.value)}
        value={resourcePersonData.phoneNo}
      />
      <Button
        variant="contained"
        color="primary"
        type="button"
        onClick={handleSubmit}
      >
        Add
      </Button>
    </div>
  );
};

export default AddResource;