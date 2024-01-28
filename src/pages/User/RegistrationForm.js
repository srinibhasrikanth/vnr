import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import axios from "axios";
const RegisterCourse = () => {
  // State for course details
  const [courseDetails, setCourseDetails] = useState({
    name: "Dummy Course",
    year: "3",
    timing: "10:00 AM - 12:00 PM",
    resourcePerson: "John Doe",
    duration: "2 hours",
    description: "This is a dummy course description.",
  });

  // State for registration form
  const [registrationData, setRegistrationData] = useState({
    name: "",
    rollNo: "",
    branch: "",
    year: "",
    section: "",
  });

  // Function to handle input changes in the registration form
  const handleInputChange = (field, value) => {
    setRegistrationData({
      ...registrationData,
      [field]: value,
    });
  };

  // Function to handle form submission
  const handleSubmit = async () => {
    // Implement logic to handle the submitted registration data
    console.log("Registration data submitted:", registrationData);
    // You can add further processing or send the data to an API
    
  };

  // Styling
  const fieldStyle = {
    marginBottom: "20px",
    width: "100%",
  };

  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh", // Set minimum height for full viewport height
    padding: "20px",
  };

  return (
    <div style={containerStyle}>
      <Grid container spacing={3}>
        {/* Left side - Course details */}
        <Grid item xs={12} sm={6}>
          <Card>
            <CardContent>
              <Typography variant="h5" mb={2}>
                Course Details
              </Typography>
              <Typography variant="subtitle1" mb={2}>
                Name: {courseDetails.name}
              </Typography>
              <Typography variant="subtitle1" mb={2}>
                Year: {courseDetails.year}
              </Typography>
              <Typography variant="subtitle1" mb={2}>
                Timing: {courseDetails.timing}
              </Typography>
              <Typography variant="subtitle1" mb={2}>
                Resource Person: {courseDetails.resourcePerson}
              </Typography>
              <Typography variant="subtitle1" mb={2}>
                Duration: {courseDetails.duration}
              </Typography>
              <Typography variant="subtitle1" mb={2}>
                Description: {courseDetails.description}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Right side - Registration form */}
        <Grid item xs={12} sm={6}>
          <Card>
            <CardContent>
              <Typography variant="h5" mb={2}>
                Registration Form
              </Typography>
              <TextField
                label="Name"
                variant="outlined"
                required
                style={fieldStyle}
                onChange={(e) => handleInputChange("name", e.target.value)}
                value={registrationData.name}
              />
              <TextField
                label="Roll Number"
                variant="outlined"
                required
                style={fieldStyle}
                onChange={(e) => handleInputChange("rollNo", e.target.value)}
                value={registrationData.rollNo}
              />
              <TextField
                label="Branch"
                select
                variant="outlined"
                required
                style={fieldStyle}
                onChange={(e) => handleInputChange("branch", e.target.value)}
                value={registrationData.branch}
              >
                {["CSE", "IT", "ECE", "EEE", "Civil", "Mechanical"].map(
                  (branch) => (
                    <MenuItem key={branch} value={branch}>
                      {branch}
                    </MenuItem>
                  )
                )}
              </TextField>
              <TextField
                label="Year"
                select
                variant="outlined"
                required
                style={fieldStyle}
                onChange={(e) => handleInputChange("year", e.target.value)}
                value={registrationData.year}
              >
                {[1, 2, 3, 4].map((year) => (
                  <MenuItem key={year} value={year}>
                    {year}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                label="Section"
                select
                variant="outlined"
                required
                style={fieldStyle}
                onChange={(e) => handleInputChange("section", e.target.value)}
                value={registrationData.section}
              >
                {["A", "B", "C", "D"].map((section) => (
                  <MenuItem key={section} value={section}>
                    {section}
                  </MenuItem>
                ))}
              </TextField>
              <Button
                variant="contained"
                color="primary"
                type="button"
                onClick={handleSubmit}
              >
                Register
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default RegisterCourse;
