import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { useAuth } from "../context/auth";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Typography } from "@mui/material";
import { useState, useEffect } from "react";

export default function Navbar() {
  const { auth, logout } = useAuth();
  const navigate = useNavigate();
  const storedAuth = JSON.parse(localStorage.getItem("auth")) || {};
  const token = storedAuth.token;
  const [isHovered, setIsHovered] = useState([false, false]);
  const location = useLocation();

  useEffect(() => {
    // Reset hover effect when location changes
    setIsHovered([false, false]);
  }, [location]);

  const handleAdd = () => {
    navigate(`/add-course/${token}`);
  };

  const handleInstructor = () => {
    navigate(`/add-instructor/${token}`);
  };

  const handleLogout = () => {
    // Check if the user is an admin and redirect accordingly
    if (auth?.user?.user?.role === "1") {
      navigate("/admin-login");
    } else {
      navigate("/");
    }

    logout();
  };

  const handleLogoClick = () => {
    if (token) {
      navigate(`/admin-dashboard/${token}`);
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: "white" }}>
        <Toolbar>
          <Grid container alignItems="center" justifyContent="space-between">
            {/* Logo and Text "VNRVJIET" on the left */}
            <Grid
              item
              container
              alignItems="center"
              spacing={2}
              className="flex"
            >
              <Grid item>
                {/* Add Link component around the logo */}
                <img
                  src="/images/vnrlogo.png"
                  alt="Logo"
                  style={{
                    width: "40px",
                    height: "40px",
                    marginRight: "8px",
                    cursor: "pointer",
                  }}
                  onClick={handleLogoClick}
                />
              </Grid>
              <Grid item>
                <Typography variant="h6" sx={{ color: "black" }}>
                  VNRVJIET
                </Typography>
              </Grid>

              <Grid item container xs={10} justifyContent="flex-end">
                {auth?.token ? (
                  <>
                    {auth?.user?.user?.role === "1" ? (
                      <>
                        <Button
                          color="inherit"
                          style={{
                            color: "black",
                            "&:hover": { backgroundColor: "#your-hover-color" },
                          }}
                          onClick={handleAdd}
                        >
                          Add Course
                        </Button>

                        <Button
                          color="inherit"
                          style={{
                            color: "black",
                            "&:hover": { backgroundColor: "#your-hover-color" },
                          }}
                          onClick={handleInstructor}
                        >
                          Add Instructor
                        </Button>
                      </>
                    ) : null}
                    <Button
                      variant="outlined"
                      onClick={handleLogout}
                      style={{
                        "&:hover": { backgroundColor: "primary" },
                      }}
                    >
                      Logout
                    </Button>
                  </>
                ) : (
                  <div className="flex gap-4">
                    <Button
                      variant={isHovered[0] ? "contained" : "outlined"}
                      onMouseEnter={() => setIsHovered([true, false])}
                      onMouseLeave={() => setIsHovered([false, false])}
                      style={{
                        "&:hover": { backgroundColor: "#your-hover-color" },
                      }}
                    >
                      <Link to="/" style={{ textDecoration: "none" }}>
                        Login
                      </Link>
                    </Button>

                    <Button
                      variant={isHovered[1] ? "contained" : "outlined"}
                      onMouseEnter={() => setIsHovered([false, true])}
                      onMouseLeave={() => setIsHovered([false, false])}
                      style={{
                        "&:hover": { backgroundColor: "#your-hover-color" },
                      }}
                    >
                      <Link to="/signup" style={{ textDecoration: "none" }}>
                        Signup
                      </Link>
                    </Button>
                  </div>
                )}
              </Grid>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
