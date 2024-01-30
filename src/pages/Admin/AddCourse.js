import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { toast } from "react-toastify";

const AddCourse = () => {
  const [courseData, setCourseData] = useState({
    courseName: "",
    year: "",
    timing: "",
    resourcePerson: "",
    duration: "",
    description: "",
    startDate: "",
  });

  const [resourcePersons, setResourcePersons] = useState([]);

  useEffect(() => {
    // Fetch resource persons from the backend API
    const fetchResourcePersons = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/v1/resource/get-instructor"
        );
        setResourcePersons(response.data);
      } catch (error) {
        console.error("Error fetching resource persons:", error);
      }
    };

    fetchResourcePersons();
  }, []); // Empty dependency array ensures that the effect runs once when the component mounts

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
    try {
      // Implement logic to handle the submitted course data
      console.log("Course data submitted:", courseData);
      // You can add further processing or send the data to an API
      const res = await axios.post(
        "http://localhost:8000/api/v1/courses/create-course",
        courseData
      );
      toast.success("Successfully course created");

      // Clear the input fields
      setCourseData({
        courseName: "",
        year: "",
        timing: "",
        resourcePerson: "",
        duration: "",
        description: "",
        startDate: "",
      });
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
    paddingTop: "20px",
  };

  return (
    <div style={containerStyle}>
      <Typography variant="h5" mb={2}>
        ADD COURSE
      </Typography>

      <TextField
        label="Name of the Course"
        variant="outlined"
        required
        style={fieldStyle}
        onChange={(e) => handleInputChange("courseName", e.target.value)}
        value={courseData.courseName}
        size="small"
      />
      <div style={{ display: "flex" }}>
        <TextField
          label="Year"
          select
          variant="outlined"
          required
          style={{ ...fieldStyle, marginRight: "10px", flex: 1 }}
          onChange={(e) => handleInputChange("year", e.target.value)}
          value={courseData.year}
          size="small"
        >
          {[1, 2, 3, 4].map((year) => (
            <MenuItem key={year} value={year}>
              {year}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          label="Course Start Date"
          type="date"
          variant="outlined"
          required
          style={{ ...fieldStyle, flex: 1 }}
          onChange={(e) => handleInputChange("startDate", e.target.value)}
          value={courseData.startDate}
          InputLabelProps={{
            shrink: true,
          }}
          size="small"
        />
      </div>
      <div style={{ display: "flex" }}>
        <TextField
          label="Duration"
          variant="outlined"
          required
          style={{ ...fieldStyle, marginRight: "10px", flex: 1 }}
          onChange={(e) => handleInputChange("duration", e.target.value)}
          value={courseData.duration}
          size="small"
        />
        <TextField
          label="Course Timings"
          variant="outlined"
          required
          style={{ ...fieldStyle, flex: 1 }}
          onChange={(e) => handleInputChange("timing", e.target.value)}
          value={courseData.timing}
          size="small"
        />
      </div>
      <TextField
        label="Resource Person"
        select
        variant="outlined"
        required
        style={fieldStyle}
        onChange={(e) => handleInputChange("resourcePerson", e.target.value)}
        value={courseData.resourcePerson}
        size="small"
      >
        {resourcePersons.map((person) => (
          <MenuItem key={person.id} value={person.name}>
            {person.name}
          </MenuItem>
        ))}
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
        size="small"
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
