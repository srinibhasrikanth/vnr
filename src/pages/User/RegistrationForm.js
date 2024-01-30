import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import axios from "axios";
import { useEffect } from "react";
import { useAuth } from "../../context/auth";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

const RegisterCourse = ({ course }) => {
  // State for course details
  const [courseDetails, setCourseDetails] = useState({});
  const navigate = useNavigate();

  // State for registration form
  const [registrationData, setRegistrationData] = useState({});

  // State to track registration status
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  // Function to handle input changes in the registration form
  const handleInputChange = (field, value) => {
    setRegistrationData({
      ...registrationData,
      [field]: value,
    });
  };

  // Function to handle form submission
  const handleSubmit = async () => {
    try {
      const res = await axios.post(
        "http://localhost:8000/api/v1/registration/register-course",
        {
          courseDetails: courseDetails,
          userDetails: registrationData,
        }
      );
      toast.success("Successfully registered");
      setRegistrationSuccess(true); // Set registration success state to true
    } catch (error) {
      console.error("Error registering course:", error);
    }
  };

  useEffect(() => {
    // Fetch course details from the backend
    const fetchCourseDetails = async () => {
      try {
        // Extract the course ID from the URL
        const courseId = window.location.pathname.split("/").pop(); // Assuming the course ID is the last part of the URL
        // Make a GET request to fetch course details
        const response = await axios.get(
          `http://localhost:8000/api/v1/courses/get-course/${courseId}`
        );
        const courseData = response.data;
        // Update the courseDetails state with the fetched data
        setCourseDetails(courseData.course);
      } catch (error) {
        console.error("Error fetching course details:", error);
      }
    };

    fetchCourseDetails();
  }, []);

  useEffect(() => {
    // Fetch user details from the backend using the user ID stored in local storage
    const fetchUserData = async () => {
      try {
        const userId = JSON.parse(localStorage.getItem("auth"))._id;
        if (!userId) {
          // Handle the case when user ID is not available in local storage
          console.error("User ID not found in local storage");
          return;
        }
        // Make a request to fetch user details using the user ID
        const response = await axios.get(
          `http://localhost:8000/api/v1/user/${userId}`
        );
        const userData = response.data;
        // Set the fetched user details to the registration data state
        setRegistrationData(userData);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

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
                Name: {courseDetails.courseName}
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
                id="outlined-read-only-input"
                InputLabelProps={{ shrink: true }}
                variant="outlined"
                required
                value={registrationData.name}
                style={fieldStyle}
                InputProps={{
                  readOnly: true,
                }}
                onChange={(e) => handleInputChange("name", e.target.value)}
              />
              <TextField
                variant="outlined"
                label="Roll Number"
                required
                id="outlined-read-only-input"
                style={fieldStyle}
                onChange={(e) => handleInputChange("rollNo", e.target.value)}
                value={registrationData.rollNumber}
                InputProps={{
                  readOnly: true,
                }}
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                variant="outlined"
                required
                label="Branch"
                id="outlined-read-only-input"
                style={fieldStyle}
                onChange={(e) => handleInputChange("branch", e.target.value)}
                value={registrationData.branch}
                InputProps={{
                  readOnly: true,
                }}
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                variant="outlined"
                required
                label="Year"
                id="outlined-read-only-input"
                style={fieldStyle}
                onChange={(e) => handleInputChange("year", e.target.value)}
                value={registrationData.year}
                InputProps={{
                  readOnly: true,
                }}
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                variant="outlined"
                required
                label="Section"
                id="outlined-read-only-input"
                style={fieldStyle}
                onChange={(e) => handleInputChange("section", e.target.value)}
                value={registrationData.section}
                InputProps={{
                  readOnly: true,
                }}
                InputLabelProps={{ shrink: true }}
              />

              {registrationSuccess ? (
                <>
                  <Button variant="contained">
                    <Link to="/dashboard/:token">Explore more courses</Link>
                  </Button>
                </>
              ) : (
                <Button
                  variant="contained"
                  color="primary"
                  type="button"
                  onClick={handleSubmit}
                >
                  Register
                </Button>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default RegisterCourse;
