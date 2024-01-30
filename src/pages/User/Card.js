// CourseCard.js
import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Link, useNavigate } from "react-router-dom";
import RegisterCourse from "./RegistrationForm";

const CourseCard = ({ course }) => {
  const navigate = useNavigate();
  const handleRegister = () => {
    const token = JSON.parse(localStorage.getItem("auth")).token;

    navigate(`/register-course/${token}/${course._id}`);
    <RegisterCourse key={course.id} course={course} />;
  };
  return (
    <Card sx={{ minWidth: 275 }} style={{ marginLeft: "10px" }}>
      <CardContent>
        <Typography variant="h5" component="div">
          {course.courseName}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          By {course.resourcePerson}
        </Typography>
        <Typography variant="body2">
          Mode: Offline
          <br />
          Time: {course.duration}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={handleRegister}>
          Register Now
        </Button>
      </CardActions>
    </Card>
  );
};

export default CourseCard;
