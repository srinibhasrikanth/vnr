import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AdminCard = ({ course }) => {
  const navigate = useNavigate();

  const handleActivate = async () => {
    try {
      await axios.put(
        `http://localhost:8000/api/v1/courses/activate/${course._id}`
      );
      console.log(`Activated`);
      // Optionally, you can update the local state or fetch courses again
      // to reflect the changes without reloading the page.
    } catch (error) {
      console.error("Error activating course:", error);
    }
  };

  const handleDeactivate = async () => {
    try {
      await axios.put(
        `http://localhost:8000/api/v1/courses/deactivate/${course._id}`
      );
      console.log("Success");
      // Optionally, you can update the local state or fetch courses again
      // to reflect the changes without reloading the page.
    } catch (error) {
      console.error("Error deactivating course:", error);
    }
  };

  const handleReport = () => {
    const token = JSON.parse(localStorage.getItem("auth")).token;
    navigate(`/course-report/${token}`);
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
      <CardActions
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          marginLeft: "5px",
          marginBottom: "5px",
        }}
      >
        {course.active === 1 && (
          <Button size="small" onClick={handleDeactivate}>
            Disable
          </Button>
        )}
        {course.upcoming === 1 && (
          <>
            <Button size="small" onClick={handleActivate}>
              Activate
            </Button>
            <div className="flex justify-end">
              <Button size="small">
                <EditIcon />
              </Button>
              <Button size="small">
                <DeleteIcon />
              </Button>
            </div>
          </>
        )}
        {course.upcoming !== 1 && course.active !== 1 && (
          <Button size="small" onClick={handleReport}>
            Report
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default AdminCard;
