import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import axios from "axios";
import { Alert } from "@mui/material";

const AddResource = ({ onResourcePersonAdded }) => {
  const [resourcePersonData, setResourcePersonData] = useState({
    name: "",
    email: "",
    designation: "",
    phoneNo: "",
    rollNo: "",
    idNumber: "",
  });

  const [successAlertOpen, setSuccessAlertOpen] = useState(false);

  const handleInputChange = (field, value) => {
    setResourcePersonData({
      ...resourcePersonData,
      [field]: value,
    });
  };

  const handleSubmit = async () => {
    try {
      const res = await axios.post(
        "http://localhost:8000/api/v1/resource/create-instructor",
        resourcePersonData
      );
      console.log("Resource person data submitted:", resourcePersonData);
      setSuccessAlertOpen(true);

      // Clear the form or reset state if needed
      setResourcePersonData({
        name: "",
        email: "",
        designation: "",
        phoneNo: "",
        rollNo: "",
        idNumber: "",
      });

      // Set a timer to hide the success alert after 3 seconds
      setTimeout(() => {
        setSuccessAlertOpen(false);
      }, 3000);
    } catch (error) {
      console.error("Error submitting form:", error);
      // Handle error if submission fails
    }
  };

  const fieldStyle = {
    marginBottom: "20px",
    width: "100%",
  };

  const containerStyle = {
    textAlign: "center",
    maxWidth: "600px",
    margin: "auto",
    paddingTop: "30px",
  };

  return (
    <div style={containerStyle}>
      <Typography variant="h5" mb={2}>
        Add Resource Person
      </Typography>
      {successAlertOpen && (
        <Alert severity="success" style={{ marginTop: "20px" }}>
          Resource person added successfully!
        </Alert>
      )}
      <TextField
        label="Name"
        variant="outlined"
        required
        style={fieldStyle}
        onChange={(e) => handleInputChange("name", e.target.value)}
        value={resourcePersonData.name}
      />
      <TextField
        label="Email"
        variant="outlined"
        required
        style={fieldStyle}
        onChange={(e) => handleInputChange("email", e.target.value)}
        value={resourcePersonData.email}
      />
      <TextField
        label="Designation (Student/Faculty)"
        select
        variant="outlined"
        required
        style={fieldStyle}
        onChange={(e) => handleInputChange("designation", e.target.value)}
        value={resourcePersonData.designation}
      >
        {["Student", "Faculty"].map((designation) => (
          <MenuItem key={designation} value={designation}>
            {designation}
          </MenuItem>
        ))}
      </TextField>
      {resourcePersonData.designation === "Student" ? (
        <TextField
          label="Roll Number"
          variant="outlined"
          style={fieldStyle}
          onChange={(e) => handleInputChange("rollNo", e.target.value)}
          value={resourcePersonData.rollNo}
        />
      ) : (
        <TextField
          label="ID Number"
          variant="outlined"
          style={fieldStyle}
          onChange={(e) => handleInputChange("idNumber", e.target.value)}
          value={resourcePersonData.idNumber}
        />
      )}
      <TextField
        label="Phone Number"
        variant="outlined"
        required
        style={fieldStyle}
        onChange={(e) => handleInputChange("phoneNo", e.target.value)}
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
