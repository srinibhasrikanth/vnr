// AddCourse.js
import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import axios from "axios";
const AddCourse = () => {
  const [courseData, setCourseData] = useState({
    courseName: "",
    year: "",
    timing: "",
    resourcePerson: "",
    duration: "",
    description: "",
  });

  const handleInputChange = (field, value) => {
    setCourseData({
      ...courseData,
      [field]: value,
    });
  };
  const handleStartDateChange = (date) => {
    setCourseData({
      ...courseData,
      startDate: date,
    });
  };

  const handleResourcePersonAdded = (resourcePersonName) => {
    setCourseData({
      ...courseData,
      resourcePerson: resourcePersonName,
    });
  };

  const handleSubmit = async () => {
    // Implement logic to handle the submitted course data
    console.log("Course data submitted:", courseData);
    // You can add further processing or send the data to an API
    const res = await axios.post(
      "http://localhost:8000/api/v1/courses/create-course",
      courseData
    );
    console.log("submitted");
  };

  const fieldStyle = {
    marginBottom: "20px",
    width: "100%",
  };

  const containerStyle = {
    textAlign: "center",
    maxWidth: "600px",
    margin: "auto",
    paddingTop: "20px",
  };

  return (
    <div style={containerStyle}>
      <Typography variant="h5" mb={2}>
        Add Course
      </Typography>
      <TextField
        label="Name of the Course"
        variant="outlined"
        required
        style={fieldStyle}
        onChange={(e) => handleInputChange("courseName", e.target.value)}
        value={courseData.courseName}
      />
      <TextField
        label="Year"
        select
        variant="outlined"
        required
        style={fieldStyle}
        onChange={(e) => handleInputChange("year", e.target.value)}
        value={courseData.year}
      >
        {[1, 2, 3, 4].map((year) => (
          <MenuItem key={year} value={year}>
            {year}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        label="Duration"
        variant="outlined"
        required
        style={fieldStyle}
        onChange={(e) => handleInputChange("duration", e.target.value)}
        value={courseData.duration}
      />
      <TextField
        label="Course Start Date"
        type="date"
        variant="outlined"
        required
        style={fieldStyle}
        onChange={(e) => handleInputChange("startDate", e.target.value)}
        value={courseData.startDate}
        InputLabelProps={{
          shrink: true,
        }}
      />
      <TextField
        label="Course Timings"
        variant="outlined"
        required
        style={fieldStyle}
        onChange={(e) => handleInputChange("timing", e.target.value)}
        value={courseData.timing}
      />
      <TextField
        label="Resource Person"
        select
        variant="outlined"
        required
        style={fieldStyle}
        onChange={(e) => handleInputChange("resourcePerson", e.target.value)}
        value={courseData.resourcePerson}
      >
        <MenuItem value="Murali Mohan">Murali Mohan</MenuItem>
        <MenuItem value="Krishna Sai">Krishna Sai</MenuItem>
        <MenuItem value="Siddharth">Siddharth</MenuItem>
      </TextField>
      <TextField
        label="Course Description"
        multiline
        rows={4}
        variant="outlined"
        required
        style={fieldStyle}
        onChange={(e) => handleInputChange("description", e.target.value)}
        value={courseData.description}
      />
      <Button
        variant="contained"
        color="primary"
        type="button"
        onClick={handleSubmit}
      >
        Add Course
      </Button>
    </div>
  );
};

export default AddCourse;
